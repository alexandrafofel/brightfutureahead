"use client";

import * as React from "react";
import CalmTipCard from "@/components/CalmTips/CalmTipCard";
import SuccessTip from "@/app/quiz/tips/SuccessTips";

export default function CalmTipFrame({
  tipText,
  headline = "You’re in a calm space.",
  subheadline = "Here’s what might bring more calm today.",
  meta = {},
  postUrl = "/api/leads",
  className,
}: {
  tipText: string;
  headline?: string;
  subheadline?: string;
  meta?: Record<string, any>;
  postUrl?: string;
  className?: string;
}) {
  const [successEmail, setSuccessEmail] = React.useState<string | null>(null);

  if (successEmail) {
    return (
      <div className={className}>
        <SuccessTip
          email={successEmail}
          onEmailChange={setSuccessEmail}
          onResend={async () => {
            try {
              await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: successEmail,
                  tipText,
                  source: "quiz_tips_resend",
                }),
              });
              (window as any)?.posthog?.capture?.("tips_email_resend");
            } catch {}
          }}
        />
      </div>
    );
  }

  return (
    <CalmTipCard
      text={tipText}
      headline={headline}
      subheadline={subheadline}
      meta={meta}
      postUrl={postUrl}
      withEmailCapture
      onSuccess={(email) => {
        console.log("[CalmTipFrame] switch → SuccessTip with", email);
        setSuccessEmail(email);
      }}
      className={className}
    />
  );
}
