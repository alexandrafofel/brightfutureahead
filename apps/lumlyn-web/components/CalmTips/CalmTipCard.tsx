"use client";

import * as React from "react";
import clsx from "clsx";

export type CalmTipCardProps = {
  /** Full calm tip text. Use `\n\n` to separate paragraphs. */
  text: string;
  /**
   * Optional headline & subheadline shown above the gradient frame.
   * Pass empty strings to hide either.
   */
  headline?: string;
  subheadline?: string;
  /** Extra classes merged on the outer wrapper (not the gradient frame). */
  className?: string;
  /** Test id for e2e */
  "data-testid"?: string;
};

/**
 * CalmTipCard
 * - Renders the headline/subheadline (22/32 & 18/28) + gradient tip frame per spec
 * - Splits `text` by blank lines into <p> blocks (centered)
 * - No inline styles, Tailwind-only; accessible and responsive
 */
export default function CalmTipCard({
  text,
  headline = "You’re in a calm space.",
  subheadline = "Here’s what might bring more calm tonight.",
  className,
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
      className={clsx(
        "w-full max-w-[390px] mx-auto flex flex-col items-center",
        className
      )}
      aria-label="Calm tip"
      data-testid={testId}
    >
      {/* Headings */}
      {headline ? (
        <h1 className="text-[#1A1A1A] font-bold text-[22px] leading-8 text-center">
          {headline}
        </h1>
      ) : null}

      {subheadline ? (
        <h2 className="mt-1 text-[#111] font-normal text-[18px] leading-7 text-center">
          {subheadline}
        </h2>
      ) : null}

      {/* Gradient frame */}
      <div
        className={clsx(
          "mt-4",
          // frame: 375 x 273 (mobile spec) with inner padding ~18 / 3 / 2 px
          "flex w-[375px] h-[273px] p-[18px] pr-[2px] pl-[3px] justify-center items-center shrink-0",
          "rounded-[12px]",
          // gradient + inner inset shadow
          "bg-[linear-gradient(90deg,rgba(158,140,246,0.80)_0%,rgba(201,189,249,0.80)_100%)]",
          "shadow-[inset_0_4px_24px_rgba(0,0,0,0.10)]",
          // upscale at md+ while keeping aspect aesthetics
          "md:w-[520px] md:h-[320px]"
        )}
        role="article"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="w-[370px] h-[237px] shrink-0 flex flex-col items-center justify-center text-center">
          {paragraphs.length === 0 ? (
            <p className="text-[#1A1A1A] text-[16px] leading-[18px] font-medium">
              A gentle step is on the way.
            </p>
          ) : (
            paragraphs.map((p, i) => (
              <p
                key={i}
                className={clsx(
                  "text-[#1A1A1A] text-[16px] leading-[18px] font-medium text-center",
                  i > 0 && "mt-3"
                )}
              >
                {p}
              </p>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
