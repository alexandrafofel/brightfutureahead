"use client";

import clsx from "clsx";
import * as React from "react";

import MobileMenu from "@/components/MobileMenu/MobileMenu";

import EmailTips from "./EmailTips";

export type CalmTipCardProps = {
  text: string;
  headline?: string;
  subheadline?: string;
  className?: string;
  meta?: Record<string, any>;
  postUrl?: string;
  withEmailCapture?: boolean;
  onInviteFriend?: () => void;
  onSuccess?: (email: string) => void; // ✅
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
  onSuccess, // ✅
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

  return (
    <section
      aria-label="Calm tip"
      className={clsx(
        "relative mx-auto w-full aspect-[195/422]",
        "border border-[#9747FF] rounded-[12px]",
        "bg-[rgba(249,246,255,0.90)] shadow-sm overflow-hidden",
        "xl:w-[730px] xl:h-[581px] h-[880px]",
        className
      )}
      data-testid={testId}
    >
      <nav aria-label="Primary nav mobile" className="absolute top-[15px] right-[30px]">
        <MobileMenu />
      </nav>

      {headline && (
        <h1 className="mt-[35%] xl:mt-[4%] text-[#1A1A1A] font-bold text-[22px] leading-[32px] text-center">
          {headline}
        </h1>
      )}
      {subheadline && (
        <h2 className=" xl:mt-[1%] text-[#111] font-normal text-[18px] leading-7 text-center">
          {subheadline}
        </h2>
      )}

      <div
        className={clsx(
          "mt-[15%] ml-[3%] w-[380px] h-[250px] p-[18px] pr-[2px] pl-[3px]",
          "xl:mt-[5%] xl:ml-[10%] xl:w-[611px] xl:h-[206px] xl:p-[13px] xl:pr-[6px] xl:pl-[12px]",
          "flex justify-center items-center shrink-0",
          "rounded-[12px]",
          "bg-[linear-gradient(90deg,rgba(158,140,246,0.80)_0%,rgba(201,189,249,0.80)_100%)]",
          "shadow-[inset_0_4px_24px_rgba(0,0,0,0.10)]"
        )}
        role="article"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="xl:w-[600px] xl:h-[206px] w-[340px] h-[237px] shrink-0 flex flex-col items-center justify-center text-center">
          {paragraphs.length === 0 ? (
            <p className="text-[#1A1A1A] text-base leading-6">…</p>
          ) : (
            paragraphs.map((p, idx) => (
              <p key={idx} className="text-[#1A1A1A] font-semibold text-base leading-6 mt-3 first:mt-0">
                {p}
              </p>
            ))
          )}
        </div>
      </div>

      {withEmailCapture && (
        <EmailTips
          tipText={text}
          meta={meta}
          postUrl={postUrl}
          className="mt-2"
          onSuccess={onSuccess}   // ✅ pasăm mai departe
          data-testid="email-tips-inline"
        />
      )}
    </section>
  );
}
