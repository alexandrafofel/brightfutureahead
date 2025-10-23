// app/quiz/outro/OutroClient.tsx
"use client";

import Lottie from "lottie-react";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import heroMob from "@/assets/lottie/hero-bg-mob.json";
import heroDesk from "@/assets/lottie/hero-bg.json";
import { Button } from "@/components/Button/button";
import { useMediaQuery } from "@/components/Quiz/useMediaQuery";

import * as OutroMsgs from "./messages/en";

export type ResultKey = "baby" | "v1" | "v2" | "v3" | "v4";

/**
 * Props suplimentare pentru a permite controlul din overlay. Dacă `variant` este
 * furnizat, nu mai este citit din query string sau din storage. Dacă
 * `onGoToTips` este furnizat, butonul CTA va apela această funcție în loc de
 * router.push. În absența lor, comportamentul original este păstrat.
 */
export type OutroClientProps = {
  variant?: ResultKey;
  onGoToTips?: () => void;
};

const OUTRO_MAP =
  (OutroMsgs as any)?.RESULT_CONTENT ??
  (OutroMsgs as any)?.default ??
  ({} as Record<ResultKey, { message: string; cta: string; href: string }>);

function readAnswers(): Record<string, any> | undefined {
  try {
    const raw =
      localStorage.getItem("lumlyn_quiz_answers") ??
      sessionStorage.getItem("lumlyn_quiz_answers");
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

function isAge0to2FromAnswers(answers?: Record<string, any>): boolean {
  if (!answers) return false;
  const q2 = String(answers?.Q2 ?? "").toLowerCase();
  return /\b0\s*[-–to_]\s*2\b/.test(q2);
}

export default function OutroClient({ variant: propVariant, onGoToTips }: OutroClientProps = {}): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery("(max-width: 767.98px)");
  const lottieData = (isMobile ? heroMob : heroDesk) as any;
  const frameRef = React.useRef<HTMLDivElement | null>(null);
  const [rect, setRect] = React.useState({ top: 0, left: 0, width: 0, height: 0 });
  React.useLayoutEffect(() => {
    const update = () => {
      if (!frameRef.current) return;
      const r = frameRef.current.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    if (frameRef.current) ro.observe(frameRef.current);
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update as any);
      window.removeEventListener("scroll", update as any);
    };
  }, []);

  const [variant, setVariant] = React.useState<ResultKey>(propVariant ?? "v4");

  React.useEffect(() => {
    if (propVariant) {
      setVariant(propVariant);
      return;
    }
    const qv = (searchParams.get("variant") || "").toLowerCase();
    if (qv === "baby" || qv === "v1" || qv === "v2" || qv === "v3" || qv === "v4") {
      setVariant(qv as ResultKey);
      return;
    }
    const answers = readAnswers();
    const isBaby = isAge0to2FromAnswers(answers);
    setVariant(isBaby ? "baby" : "v1");
  }, [searchParams, propVariant]);

  // logare la montare
  React.useEffect(() => {
     
    console.log("[Outro] mounted");
  }, []);

  const content =
    OUTRO_MAP?.[variant] ??
    OUTRO_MAP?.v4 ?? {
      message:
        "Yes, what you’re experiencing is normal. Here’s a short solution that brings you more clarity.",
      cta: "I want the solution",
      href: "/quiz/tips",
    };

  const onClickCTA = () => {
    (window as any)?.posthog?.capture?.("quiz_outro_cta");
    if (onGoToTips) {
      // dacă vine din overlay, nu navigăm full page
      onGoToTips();
    } else {
      router.push(content.href);
    }
  };

  return (
    <main className="relative w-fullflex items-center justify-center px-6 py-10">
      <section
        ref={frameRef}
        className=" relative z-20 flex flex-col
            xl:w-[640px] xl:h-[460px]  w-[390px] h-[844px] 
            items-center
            px-[35px] pt-[287px] pb-[355px]
            gap-[46px]
            rounded-[12px]
            border border-[#9747FF]
            bg-[rgba(249,246,255,0.90)]
            md:items-start
            md:p-8
            md:gap-5
            md:shrink-0
            md:aspect-[32/23]
            md:border-[3px]"
        aria-labelledby="outro-heading"
      >
        <h2 id="outro-heading" className="sr-only">
          Outro
        </h2>
        <div
          aria-live="polite"
          aria-atomic="true"
          className="flex flex-col items-center justify-center md:absolute bottom-[150px] left-0 right-0 mx-auto w-full md:w-[576px] px-4"
        >
          <p className="text-[#1A1A1A] text-lg xl:text-xl mb-[27px] leading-8 xl:font-bold !font-extrabold text-center">
            {content.message}
          </p>
          <Button
            variant="primary"
            className="xl:mt-6 mt-5"
            onClick={onClickCTA}
            data-role="quiz_outro_cta"
          >
            {content.cta}
          </Button>
        </div>
      </section>
    </main>
  );
}
