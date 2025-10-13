"use client";

import * as React from "react";
import clsx from "clsx";
import { Button } from "@/components/Button/button";
import { FooterLP } from "@/components/Quiz/FooterLP";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import LottieBG from "@/components/Lottie/LottieBackgroundResponsive";
import heroDesktop from "@/assets/lottie/hero-bg.json";
import heroMobile from "@/assets/lottie/hero-bg-mob.json";

/** Pragmatic email regex (suficient pentru produs) */
const EMAIL_RGX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; email: string }
  | { status: "error"; message: string };

export type CalmTipCardProps = {
  text: string; // Full calm tip text. Use `\n\n` to separate paragraphs.
  headline?: string;
  subheadline?: string;
  className?: string;
  meta?: Record<string, any>;
  postUrl?: string; // default: /api/leads
  withEmailCapture?: boolean;
  onInviteFriend?: () => void;
  "data-testid"?: string;
};

export default function CalmTipCard({
  text,
  headline = "You’re in a calm space.",
  subheadline = "Here’s what might bring more calm today.",
  className,
  meta = {},
  postUrl = "/api/leads",
  withEmailCapture = true,
  onInviteFriend,
  "data-testid": testId = "calm-tip-card",
}: CalmTipCardProps): JSX.Element {
  const paragraphs = React.useMemo(
    () =>
      String(text || "")
        .trim()
        .split(/\n{2,}/)
        .map((t) => t.trim())
        .filter(Boolean),
    [text]
  );

  // Email state
  const [email, setEmail] = React.useState("");
  const [submit, setSubmit] = React.useState<SubmitState>({ status: "idle" });

  const emailTrim = email.trim().toLowerCase();
  const emailValid = EMAIL_RGX.test(emailTrim);
  const isSubmitting = submit.status === "submitting";
  const isDisabled = !emailValid || isSubmitting;
  const buttonVariant = isSubmitting
    ? "loading"
    : !emailValid
    ? "deactivated"
    : "secondary";

  const onSubmitEmail: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!emailValid || isSubmitting) return;

    setSubmit({ status: "submitting" });
    (window as any)?.posthog?.capture?.("tips_email_submit_start", {
      ...meta,
      email_domain: emailTrim.split("@")[1] || "",
    });

    try {
      const res = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailTrim,
          ...meta,             // <— corect (era .meta)
          tipText: text,       // <— ce așteaptă șablonul CalmTipEmail
          tip_text: text,      // <— compat vechi pentru BE
          source: "quiz_tips",
        }),
      });

      if (!res.ok) {
        let message = `HTTP ${res.status}`;
        try {
          const body = await res.json();
          if (body?.error) message = body.error;
        } catch {}
        throw new Error(message);
      }

      setSubmit({ status: "success", email: emailTrim });
      (window as any)?.posthog?.capture?.("tips_email_submit_success", { ...meta });
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
      await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: submit.email,
          ...meta,        // <— corect (era .meta în unele versiuni)
          tipText: text,
          tip_text: text,
          source: "quiz_tips_resend",
        }),
      });
    } catch {
      // best-effort
    }
  };

  return (
    <section aria-label="Calm tip"
      className={clsx(
        "relative mx-auto w-full aspect-[195/422]",
        "border border-[#9747FF] rounded-[12px]",
        "bg-[rgba(249,246,255,0.90)] shadow-sm overflow-hidden",
        "xl:w-[640px] xl:h-[460px] h-[880px]",
        className
      )}
      
      data-testid={testId}
    >
      <LottieBG desktopSrc={heroDesktop} mobileSrc={heroMobile} breakpoint={768} />
      <nav aria-label="Primary nav mobile" className="xl:hidden absolute top-[15px] right-[30px]">
        <MobileMenu />
      </nav> 

      {/* Headings */}
      {headline ? (
        <h1 className="mt-[35%] text-[#1A1A1A] font-bold text-[22px] leading-[32px] text-center">
          {headline}
        </h1>
      ) : null}

      {subheadline ? (
        <h2 className="text-[#111] font-normal text-[18px] leading-7 text-center">
          {subheadline}
        </h2>
      ) : null}

      {/* Gradient frame */}
      <div
        className={clsx(
          "mt-[15%] ml-[3%] w-[380px] h-[250px] p-[18px] pr-[2px] pl-[3px]",
          "flex justify-center items-center shrink-0",
          "rounded-[12px]",
          "bg-[linear-gradient(90deg,rgba(158,140,246,0.80)_0%,rgba(201,189,249,0.80)_100%)]",
          "shadow-[inset_0_4px_24px_rgba(0,0,0,0.10)]",
          "xl:w-[611px] xl:h-[206px]"
        )}
        role="article"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="xl:w-[600px] xl:h-[220px] w-[340px] h-[237px] shrink-0 flex flex-col items-center justify-center text-center">
          {paragraphs.length === 0 ? (
            <p className="text-[#1A1A1A] text-base leading-6">…</p>
          ) : (
            paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={clsx(
                  "text-[#1A1A1A] font-semibold",
                  "text-base leading-6",
                  idx > 0 && "mt-3"
                )}
              >
                {p}
              </p>
            ))
          )}
        </div>
      </div>

      {/* Email capture — în același container + bg */}
      {withEmailCapture && (
        <div
          className="w-full max-w-[354px] text-[#1A1A1A] font-semibold text-base leading-[18px] mx-auto mt-4"
          aria-labelledby="email-capture-title"
        >
          <h3 id="email-capture-title" className="sr-only">
            Receive your full calm tip by email
          </h3>

          <label
            htmlFor="email"
            className="block ml-3 text-[#344054] text-sm font-semibold mt-[10%]"
          >
            Email
          </label>

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
                flex w-[320px] h-[40px] px-4 py-3 mb-[10%]
                rounded-[12px] border border-[#D0D5DD] bg-white
                placeholder:text-[#667085] text-sm
                focus:outline-none focus:ring-2 focus:ring-[#9747FF] focus:ring-offset-2
              "
              aria-invalid={email.length > 0 && !emailValid}
            />

            <Button
              variant={buttonVariant as any}
              type="submit"
              disabled={isDisabled}
              className="mt-[5%]"
              data-role="tips_email_submit"
            >
              {isSubmitting ? "Sending…" : "Send me the full calm tip"}
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
            {/* <div className="mt-3 flex items-center gap-3 ">
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
                onClick={onInviteFriend}
                className="
                  underline text-sm text-[#667085]
                  focus:outline-none focus:ring-2 focus:ring-[#9747FF] focus:ring-offset-2 rounded
                "
              >
                Invite a friend
              </button>
            </div> */}

            {/* Footer mutat în interiorul cardului */}
            <FooterLP />
          </form>
        </div>
      )}
    </section>
  );
}
