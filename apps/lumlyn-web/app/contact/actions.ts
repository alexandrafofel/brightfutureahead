"use server";

import { headers } from "next/headers";
import { rateLimit } from "./rate-limit";

/**
 * Server action to handle submission of the contact form.
 *
 * Because this code executes on the server it can access HTTP headers to
 * implement per-IP rate limiting and perform an authenticated call to the
 * backend API.  Validation is duplicated here to protect the server from
 * malformed input in case the client-side checks are bypassed.
 *
 * The returned object follows a simple `{ ok: boolean, error?: string }` shape
 * which is consumed by the client component.  When `ok` is `false` a
 * descriptive `error` message may be provided, although the UI will display
 * a generic toast.
 */
export async function submitContact(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  // Extract raw values from FormData.  Each call to `get` returns `FormDataEntryValue | null`.
  const emailValue = formData.get("email");
  const messageValue = formData.get("message");
  const nameValue = formData.get("name");
  const consentValue = formData.get("consent");
  
  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  const message = typeof messageValue === "string" ? messageValue.trim() : "";
  const name = typeof nameValue === "string" && nameValue.trim() !== "" ? nameValue.trim() : undefined;
  // Checkbox values come back as "on" or may be omitted.
  const consent = consentValue === "on" || consentValue === "true";

  // Server-side validation mirrors the client rules.  We do not reveal
  // specific error messages to the user in the toast to avoid exposing
  // implementation details.  Instead a generic error toast is shown on
  // failure.  These checks still short-circuit the network call when
  // invalid input is detected.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ok: false, error: "Invalid email" };
  }
  if (message.length < 10) {
    return { ok: false, error: "Message too short" };
  }
  if (!consent) {
    return { ok: false, error: "Consent not given" };
  }

  // Read the request headers to attempt to identify the client IP.  On
  // Vercel and many proxies the original IP is forwarded in
  // `x-forwarded-for`.  If not present we fall back to a constant string.
  const hdrs = await headers();
  const forwarded = hdrs.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

  // Apply a very simple rate‑limit to protect the backend.  This uses an
  // in‑memory map and therefore resets whenever the server process restarts.
  if (!rateLimit(ip).allowed) {
    return { ok: false, error: "Too many requests" };
  }

  // Determine the session identifier.  In a real application this would be
  // derived from cookies or Supabase auth.  Until that mechanism is
  // implemented we fall back to a sentinel value so the API contract
  // remains stable.
  const sessionId = hdrs.get("x-session-id") ?? "unknown";

  // Compose the payload for the lead endpoint.  Note that `consent` is
  // converted to a boolean literal for clarity.
  const payload = {
    email,
    message,
    consent: true,
    name,
    session_id: sessionId,
  } as const;

  try {
    // Build an absolute URL for the lead endpoint.  Node’s fetch cannot
    // resolve relative URLs on the server, so we compute a base
    // (`NEXT_PUBLIC_BASE_URL` or `VERCEL_URL` or localhost) and resolve
    // any relative path.  If `NEXT_PUBLIC_LEAD_ENDPOINT` is already
    // absolute (includes a scheme), it is used directly.
    const envEndpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;
    const isAbsolute = (str?: string) => !!str && /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(str);
    let leadUrl: string;
    if (envEndpoint && isAbsolute(envEndpoint)) {
      leadUrl = envEndpoint;
    } else {
      const baseEnv = process.env.NEXT_PUBLIC_BASE_URL;
      const vercelDomain = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
      const base = baseEnv ?? vercelDomain ?? "http://localhost:3000";
      const path = envEndpoint ?? "/lead";
      leadUrl = new URL(path, base).toString();
    }

    const response = await fetch(leadUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      // Log the response text on the server for debugging purposes.  This
      // information is not surfaced to the client.
      try {
        const text = await response.text();
        console.error("POST /lead failed", text);
      } catch (_) {
        /* noop */
      }
      return { ok: false, error: "Failed to submit" };
    }
    return { ok: true };
  } catch (err) {
    console.error("Error submitting contact", err);
    return { ok: false, error: "Error submitting" };
  }
}
