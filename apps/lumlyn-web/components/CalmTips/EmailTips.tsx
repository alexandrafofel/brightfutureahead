"use client";

import clsx from "clsx";
import * as React from "react";

import { Button } from "@/components/Button/button";

const EMAIL_RGX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; email: string }
  | { status: "error"; message: string };

export type EmailTipsProps = {
  tipText: string;
  meta?: Record<string, any>;
  postUrl?: string;
  className?: string;
  onSuccess?: (email: string) => void;
  "data-testid"?: string;
};

export default function EmailTips({
  tipText,
  meta = {},
  postUrl = "/api/leads",
  className,
  onSuccess,
  "data-testid": testId = "email-tips",
}: EmailTipsProps): JSX.Element {
  const [email, setEmail] = React.useState("");
  const [submit, setSubmit] = React.useState<SubmitState>({ status: "idle" });

  const formRef = React.useRef<HTMLFormElement | null>(null);
  const hiddenSubmitRef = React.useRef<HTMLButtonElement | null>(null);

  const emailTrim = email.trim().toLowerCase();
  const emailValid = EMAIL_RGX.test(emailTrim);
  const isSubmitting = submit.status === "submitting";
  const isDisabled = !emailValid || isSubmitting;

  // no-op defensiv dacă parent-ul nu a pasat onSuccess
  const emitSuccess = (em: string) => {
    try {
      console.log("[EmailTips] onSuccess()", em);
      (window as any)?.posthog?.capture?.("tips_ui_success_callback", { email_len: em.length });
      onSuccess?.(em);
    } catch (e) {
      console.warn("[EmailTips] onSuccess threw", e);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
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
          ...meta,
          tipText,
          tip_text: tipText, // compat vechi
          source: "quiz_tips",
        }),
      });

      if (res.ok) {
        // 🔥 emit imediat succesul astfel încât parent-ul să comute frame-ul
        emitSuccess(emailTrim);
        setSubmit({ status: "success", email: emailTrim });
        (window as any)?.posthog?.capture?.("tips_email_submit_success", { ...meta });
        return;
      }

      // HTTP error
      let message = `HTTP ${res.status}`;
      try {
        const body = await res.json();
        if (body?.error) message = body.error;
      } catch {}
      throw new Error(message);
    } catch (err: any) {
      const message = err?.message ?? "Network error. Please try again.";
      setSubmit({ status: "error", message });
      (window as any)?.posthog?.capture?.("tips_email_submit_error", {
        ...meta,
        message,
      });
    }
  };

  // Submit „imposibil de ratat”
  const triggerSubmit = () => {
    if (formRef.current?.requestSubmit) {
      formRef.current.requestSubmit();
    } else {
      hiddenSubmitRef.current?.click();
    }
  };

  return (
    <div
      className={clsx(
        "w-full max-w-[354px] mx-auto text-[#1A1A1A] font-semibold text-base leading-[18px]",
        className
      )}
      aria-labelledby="email-capture-title"
      data-testid={testId}
    >
      <h3 id="email-capture-title" className="sr-only">
        Receive your full calm tip by email
      </h3>

      <label
        htmlFor="email"
        className="block ml-4 text-[#344054] text-left text-sm font-semibold mt-[10%] xl:mt-2"
      >
        Email
      </label>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-2"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            triggerSubmit();
          }
        }}
      >
        {/* Fallback submit ascuns pentru 100% compat */}
        <button ref={hiddenSubmitRef} type="submit" className="sr-only">
          submit
        </button>

        <div className="flex flex-col gap-3">
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Enter your email to receive your full calm tip"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={email.length > 0 && !emailValid}
            aria-describedby="email-help email-error"
            className={clsx(
              "w-full rounded-[12px] border",
              "px-4 py-3 bg-white/80 outline-none",
              "focus:ring-2 focus:ring-[#9747FF] focus:border-[#9747FF]",
              !emailValid && email.length > 0
                ? "border-red-400"
                : "border-[#D0D5DD]"
            )}
          />

          <div id="email-help" className="ml-1 text-xs font-normal text-[#475467]">
            We’ll use your email only to send your tip & early-access invite.
            You can unsubscribe anytime.
          </div>

          {submit.status === "error" && (
            <div id="email-error" role="alert" className="ml-1 text-xs font-semibold text-red-600">
              {submit.message || "Something went wrong. Please try again in a moment."}
            </div>
          )}

          <div className="flex items-center justify-center mt-1">
            <Button
              type="button"
              onClick={triggerSubmit}
              variant={
                isSubmitting ? ("loading" as any) : !emailValid ? ("deactivated" as any) : ("primary" as any)
              }
              disabled={!emailValid || isSubmitting}
              aria-disabled={!emailValid || isSubmitting}
              data-testid="email-submit-button"
            >
              Get my calm tip
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
