"use client";

import clsx from "clsx";
import * as React from "react";
import { motion } from "framer-motion";
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
  onSuccess?: (email: string) => void;
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
  onSuccess,
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
      {/* Mobile Menu */}
      <nav aria-label="Primary nav mobile" className="absolute top-[15px] right-[30px]">
        <MobileMenu />
      </nav>

      {/* Headline */}
      {headline && (
        <h1 className="mt-[35%] xl:mt-[4%] text-[#1A1A1A] font-bold text-[22px] leading-[32px] text-center">
          {headline}
        </h1>
      )}

      {/* Subheadline */}
      {subheadline && (
        <h2 className="xl:mt-[1%] text-[#111] font-normal text-[18px] leading-7 text-center">
          {subheadline}
        </h2>
      )}

      {/* Gradient feedback block */}
      <div
        className={clsx(
          "mt-[10%] ml-[3%] xl:mt-[5%] xl:ml-[10%]",
          "flex justify-center items-center",
          "rounded-[12px] shadow-[inset_0_4px_24px_rgba(0,0,0,0.10)]",
          "bg-[linear-gradient(90deg,rgba(158,140,246,0.80)_0%,rgba(201,189,249,0.80)_100%)]",
          "p-4 xl:p-6",
          "max-w-[90vw] xl:max-w-[611px]",
          "w-auto h-auto"
        )}
        role="article"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="flex flex-col items-center justify-center text-center w-full break-words">
          {paragraphs.length === 0 ? (
            <p className="text-[#1A1A1A] text-base leading-6">…</p>
          ) : (
            paragraphs.map((p, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="text-[#1A1A1A] font-semibold text-base leading-6 mt-3 first:mt-0"
              >
                {p}
              </motion.p>
            ))
          )}
        </div>
      </div>

      {/* Email Capture */}
      {withEmailCapture && (
        <EmailTips
          tipText={text}
          meta={meta}
          postUrl={postUrl}
          className="mt-2"
          onSuccess={onSuccess}
          data-testid="email-tips-inline"
        />
      )}
    </section>
  );
}
