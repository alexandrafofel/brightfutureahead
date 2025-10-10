"use client";

import * as React from "react";
import { useRouter } from "next/navigation";


import { useMediaQuery } from "@/components/Quiz/useMediaQuery";
import { Button } from "@/components/Button/button";
import {FooterLP} from "@/components/Quiz/FooterLP";
import CalmTipCard from "@/components/CalmTips/CalmTipCard";
import InviteAFriend from "@/components/CalmTips/InviteAFriend";

import getCalmTip from "@/functions/getCalmTip";


/** Helpers */
const EMAIL_RGX =
  // robust, pragmatic regex (not RFC-5322 complete, but safe for product use)
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; email: string }
  | { status: "error"; message: string };

export default function TipsPage(): JSX.Element {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 767.98px)");

  // === Load answers (persisted de /quiz/run) ===
  const [answers, setAnswers] = React.useState<Record<string, any> | null>(null);

  React.useEffect(() => {
    try {
      const raw =
        localStorage.getItem("lumlyn_quiz_answers") ??
        sessionStorage.getItem("lumlyn_quiz_answers");
      setAnswers(raw ? JSON.parse(raw) : {});
    } catch {
      setAnswers({});
    }
  }, []);

  // === Compute calm tip (determinist, with fallback) ===
  const tipResult = React.useMemo(() => getCalmTip(answers || undefined), [answers]);
  const tipText = tipResult.tip.text;
  const meta = {
    tip_id: tipResult.tip.tip_id,
    topic: tipResult.tip.topic,
    age_band: tipResult.tip.age_band,
    user_type: tipResult.classified.user_type,
    strategy: tipResult.strategy,
  };

  // === Analytics (shown) ===
  React.useEffect(() => {
    (window as any)?.posthog?.capture?.("calm_tip_shown", meta);
  }, [meta.tip_id]);

  // === Email capture state ===
  const [email, setEmail] = React.useState("");
  const [submit, setSubmit] = React.useState<SubmitState>({ status: "idle" });
  const [inviteOpen, setInviteOpen] = React.useState(false);

  const emailValid = EMAIL_RGX.test(email.trim());

  const onSubmitEmail: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!emailValid || submit.status === "submitting") return;

    setSubmit({ status: "submitting" });
    (window as any)?.posthog?.capture?.("tips_email_submit_start", {
      ...meta,
      email_domain: email.split("@")[1] || "",
    });

    try {
      // Endpoint provizoriu — îl vom ajusta împreună când definim backend-ul
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          ...meta,
          tip_text: tipText, 
          source: "quiz_tips",
        }),
      });

      if (!res.ok) {
        const body = await safeJson(res);
        throw new Error(body?.error || `HTTP ${res.status}`);
      }

      setSubmit({ status: "success", email: email.trim().toLowerCase() });
      (window as any)?.posthog?.capture?.("tips_email_submit_success", {
        ...meta,
      });
    } catch (err: any) {
      const message = err?.message ?? "Something went wrong. Please try again.";
      setSubmit({ status: "error", message });
      (window as any)?.posthog?.capture?.("tips_email_submit_error", {
        ...meta,
        message,
      });
    }
  };

  const onResend = async () => {
    if (submit.status !== "success") return;
    (window as any)?.posthog?.capture?.("tips_email_resend", { ...meta });
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: submit.email,
          ...meta,
          tip_text: tipText,
          source: "quiz_tips_resend",
        }),
      });
    } catch {
      // best-effort
    }
  };

  return (
    <main 
      className="
        relative 
        flex items-center justify-center 
        px-4 py-8">
      {/* Background Lottie */}

      {/* Content frame */}
      <div 
        className="
          relative z-20 flex flex-col items-center">
        {/* Calm Tip Card */}
        <CalmTipCard
          
          text={tipText}
          headline="You’re in a calm space."
          subheadline="Here’s what might bring more calm today."
          className="mt-6"
        />

        {/* Email capture frame */}
        <section
          className="
            w-full max-w-[354px]
            rounded-[12px] bg-[rgba(249,246,255,0.90)]
            text-[#1A1A1A] font-medium text-[16px] leading-[18px]
            mx-auto p-4
          "
          aria-labelledby="email-capture-title"
        >
          <h3 id="email-capture-title" className="sr-only">
            Receive your full calm tip by email
          </h3>

          {/* Label */}
          <label
            htmlFor="email"
            className="text-left text-[#344054] text-xs font-semibold w-[38px]"
          >
            Email
          </label>

          {/* Input + CTA */}
          <form onSubmit={onSubmitEmail} className="mt-2 flex flex-col items-center">
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to receive your full calm tip"
              className="
                flex w-[339px] h-[40px] px-4 py-3
                rounded-[12px] border border-[#D0D5DD] bg-white
                placeholder:text-[#667085] text-[#1A1A1A]
                focus:outline-none focus:ring-2 focus:ring-[#9747FF] focus:ring-offset-2
              "
              aria-invalid={email.length > 0 && !emailValid}
            />

            <Button
              type="submit"
              variant="secondary"
              disabled={!emailValid || submit.status === "submitting"}
              className="mt-10"
              data-role="tips_email_submit"
            >
              {submit.status === "submitting" ? "Sending…" : "Send me the full calm tip"}
            </Button>

            {/* Success / Error states */}
            <div className="mt-3 min-h-[24px]">
              {submit.status === "success" && (
                <p
                  className="text-sm font-semibold text-[#0F8A4D]"
                  role="status"
                  aria-live="polite"
                >
                  Sent to <span className="font-bold">{submit.email}</span>. Check your inbox.
                </p>
              )}
              {submit.status === "error" && (
                <p
                  className="text-sm font-semibold text-[#B42318]"
                  role="alert"
                  aria-live="assertive"
                >
                  {submit.message}
                </p>
              )}
            </div>

            {/* Resend + Invite a friend */}
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={onResend}
                disabled={submit.status !== "success"}
                className="
                  underline text-sm text-[#667085] disabled:opacity-50
                  focus:outline-none focus:ring-2 focus:ring-[#9747FF] focus:ring-offset-2 rounded
                "
              >
                Resend email
              </button>
              <span className="text-[#D0D5DD]">•</span>
              <button
                type="button"
                onClick={() => setInviteOpen(true)}
                className="
                  underline text-sm text-[#667085]
                  focus:outline-none focus:ring-2 focus:ring-[#9747FF] focus:ring-offset-2 rounded
                "
              >
                Invite a friend
              </button>
            </div>
          </form>
        </section>

        {/* Footer at 52px under button area */}
        <div className="mt-[52px] w-full flex justify-center">
          <FooterLP />
        </div>
      </div>

      {/* Invite modal */}
      <InviteAFriend open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </main>
  );
}

/** safe JSON body extraction */
async function safeJson(res: Response): Promise<any | null> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
