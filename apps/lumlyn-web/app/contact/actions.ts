"use server";

import { z } from "zod";
import { headers } from "next/headers";
// ajustează importul dacă aliasul @ nu e configurat
import { rateLimit } from "./rate-limit";

/** Schema de validare pentru form-ul de contact */
const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name too short")
    .max(80, "Name too long")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  email: z.string().trim().email("Invalid email"),
  message: z.string().trim().min(4, "Message too short").max(5000, "Message too long"),
  consent: z.boolean().refine((v) => v === true, { message: "Consent is required" }),
});

export type SubmitContactResult = { ok: true } | { ok: false; error: string };

/**
 * ENV așteptate:
 * - NEXT_PUBLIC_LEAD_ENDPOINT / LEAD_ENDPOINT (backend-ul care trimite auto-reply la user)
 * - RESEND_API_KEY (cheia Resend)
 * - CONTACT_FORWARD_TO (ex: contact@lumlyn.com)
 * - CONTACT_DEBUG=1 (opțional, pentru mesaje de eroare detaliate în toast)
 */
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const CONTACT_FORWARD_TO = process.env.CONTACT_FORWARD_TO ?? "";
const LEAD_ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? process.env.LEAD_ENDPOINT ?? "";
const DEBUG = process.env.CONTACT_DEBUG === "1";

async function getClientIp(): Promise<string> {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() ?? "unknown";
  return h.get("x-real-ip") ?? "unknown";
}

async function forwardToTeam(params: {
  name?: string;
  email: string;
  message: string;
}): Promise<void> {
  if (!RESEND_API_KEY || !CONTACT_FORWARD_TO) return;

  const { name, email, message } = params;
  try {
    const body = {
      from: "Lumlyn <contact@lumlyn.com>",
      to: [CONTACT_FORWARD_TO],
      reply_to: email, // permite Reply direct către user din inbox
      subject: `[Contact] ${name ?? email}`,
      text: `From: ${name ?? "(no name)"} <${email}>\n\n${message}`,
    } as const;

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!r.ok) {
      const t = await r.text().catch(() => "");
      console.error("[contact] Resend forward failed", r.status, t);
    }
  } catch (e) {
    console.error("[contact] Resend forward error", e);
  }
}

async function postLead(payload: unknown): Promise<Response> {
  if (!LEAD_ENDPOINT) {
    // fallback: nu blocăm UX-ul dacă endpoint-ul nu e setat încă
    return new Response("lead endpoint missing", { status: 200 });
  }
  return fetch(LEAD_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}

export async function submitContact(formData: FormData): Promise<SubmitContactResult> {
  try {
    // 1) Extract & validate
    const raw = {
      name: (formData.get("name") ?? "") as string,
      email: (formData.get("email") ?? "") as string,
      message: (formData.get("message") ?? "") as string,
      consent: String(formData.get("consent") ?? "false") === "true",
    };
    const parsed = ContactSchema.safeParse(raw);
    if (!parsed.success) {
      const msg = parsed.error.issues?.[0]?.message ?? "Invalid payload";
      return { ok: false, error: msg };
    }

    const { name, email, message, consent } = parsed.data;

    // 2) Rate-limit per IP (semnătura existentă primește DOAR cheia string)
    const ip = await getClientIp();
    try {
      await rateLimit(`contact:${ip}`);
    } catch (e) {
      return {
        ok: false,
        error: DEBUG
          ? `RATE_LIMIT:${(e as Error)?.message ?? String(e)}`
          : "Too many requests. Please try again later.",
      };
    }

    // 3) Payload pentru lead (auto-reply la user e orchestrat în backend)
    const payload = {
      name,
      email,
      message,
      consent,
      source: "web_contact",
      ts: new Date().toISOString(),
    };

    // 4) Așteptăm LEAD (pentru a garanta auto-reply la user)
    const leadResp = await postLead(payload);

    // 5) Forward către echipă (NON-BLOCKING, nu afectează UX)
    const forwardPromise = forwardToTeam({ name, email, message });
    await Promise.allSettled([forwardPromise]);

    // 6) Dacă lead a eșuat, informăm utilizatorul
    if (!leadResp.ok) {
      const body = await leadResp.text().catch(() => "");
      return {
        ok: false,
        error: DEBUG
          ? `LEAD_FAIL:${leadResp.status}:${body.slice(0, 300)}`
          : "Something went wrong. Please try again.",
      };
    }

    return { ok: true };
  } catch (e) {
    console.error("[contact] submitContact fatal", e);
    return {
      ok: false,
      error: DEBUG
        ? `FATAL:${(e as Error)?.message ?? String(e)}`
        : "Unexpected error. Please try again.",
    };
  }
}
