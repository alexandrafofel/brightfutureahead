"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Lottie from "lottie-react";

import { Button } from "@/components/Button/button";
import { useMediaQuery } from "@/components/Quiz/useMediaQuery";

import heroDesk from "@/assets/lottie/hero-bg.json";
import heroMob from "@/assets/lottie/hero-bg-mob.json";
import * as OutroMsgs from "./messages/en";

type ResultKey = "baby" | "v1" | "v2" | "v3" | "v4";

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

export default function QuizOutroPage(): JSX.Element {
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

  const [variant, setVariant] = React.useState<ResultKey>("v4");

  React.useEffect(() => {
    // 1) explicit din query are prioritate
    const qv = (searchParams.get("variant") || "").toLowerCase();
    if (qv === "baby" || qv === "v1" || qv === "v2" || qv === "v3" || qv === "v4") {
      setVariant(qv as ResultKey);
      return;
    }

    // 2) fallback derivat din answers (baby vs non-baby); dacă non-baby și nu există variant, pornim de la v1
    const answers = readAnswers();
    const isBaby = isAge0to2FromAnswers(answers);
    setVariant(isBaby ? "baby" : "v1");
  }, [searchParams]);

  const content =
    OUTRO_MAP?.[variant] ??
    OUTRO_MAP?.v4 ?? {
      message:
        "Yes, what you’re experiencing is normal. Here’s a short solution that brings you more clarity.",
      cta: "I want the solution",
      href: "/quiz/tips",
    };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center px-6 py-10">
      {/* Background */}
      <div
        aria-hidden
        className={
          "pointer-events-none z-0 " +
          "absolute inset-x-0 top-0 h-[940px] " +
          "md:fixed md:inset-0 md:h-auto"
        }
      >
        <Lottie animationData={lottieData} loop autoplay />
      </div>

      {/* Overlay blur */}
      {rect.width > 0 && (
        <div
          className="fixed inset-0 z-10 pointer-events-none bg-black/50 backdrop-blur-[10px] opacity-100"
          aria-hidden
        />
      )}

      {/* Frame Outro conform spec-ului */}
      <section
        ref={frameRef}
        className=" relative z-20 flex flex-col
    /* — Mobile (default) — */
    w-[390px] h-[844px]
    items-center
    px-[35px] pt-[287px] pb-[355px]
    gap-[46px]
    rounded-[12px]
    border border-[#9747FF]
    bg-[rgba(249,246,255,0.90)]
    /* — Desktop (md+) overrides — */
    md:w-[640px] md:h-[460px]
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
            onClick={() => router.push(content.href)}
            data-role="quiz_outro_cta"
          >
            {content.cta}
          </Button>
        </div>
      </section>
    </main>
  );
}
