"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button/button";
import { quizReducer, createInitialState } from "../lib/quizReducer";
import { quizQuestions, midCheck, labels } from "../messages/quiz-options";
import Lottie from "lottie-react";

// Lottie JSON – import static cu alias @
import heroDesk from "@/assets/lottie/hero-bg.json";
import heroMob from "@/assets/lottie/hero-bg-mob.json";

/* Hook media-query sigur (fără SSR mismatch) */
function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else (mq as any).addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else (mq as any).removeListener(update);
    };
  }, [query]);
  return matches;
}

export default function QuizRunPage() {
  const router = useRouter();
  const [state, dispatch] = React.useReducer(
    quizReducer as React.Reducer<any, any>,
    createInitialState()
  );

  const optionRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIdx, setActiveIdx] = React.useState(0);

  // ——— Background Lottie: mobil/desktop
  const isMobile = useMediaQuery("(max-width: 767.98px)");
  const lottieData = (isMobile ? heroMob : heroDesk) as any;

  // ——— Overlay “gaură” în jurul frame-ului (blur + darken + opacity)
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

  // ——— Lifecycle quiz
  React.useEffect(() => {
    (window as any)?.posthog?.capture?.("quiz_start");
    dispatch({ type: "START" });
  }, []);

  React.useEffect(() => {
    if (state.step === "complete") {
      (window as any)?.posthog?.capture?.("quiz_complete");
      router.replace("/quiz/outro");
    }
  }, [state.step, router]);

  React.useEffect(() => {
    if (state.step !== "question") return;
    const q = quizQuestions[state.index];
    const selectedId = (state as any).answers?.[q.id];
    const idx = Math.max(0, q.options.findIndex((o) => o.id === selectedId));
    setActiveIdx(idx);
    requestAnimationFrame(() => optionRefs.current[idx]?.focus?.());
  }, [state]);

  // ——— Feedback vizibil la click: buton activ, apoi next după 250ms
  const [activating, setActivating] = React.useState<{ qid: string; oid: string } | null>(null);
  const ANSWER_DELAY = 250;

  const handleAnswer = React.useCallback((qid: string, oid: string) => {
    setActivating({ qid, oid });
    (window as any)?.posthog?.capture?.("quiz_answer_click", { qid, oid });
    window.setTimeout(() => {
      (window as any)?.posthog?.capture?.("quiz_answer", { qid, oid });
      dispatch({ type: "ANSWER", qid, oid });
      setActivating(null);
    }, ANSWER_DELAY);
  }, []);

  const handleContinue = React.useCallback(() => {
    (window as any)?.posthog?.capture?.("quiz_midcheck_continue");
    dispatch({ type: "CONTINUE" });
  }, []);

  const handleBack = React.useCallback(() => {
    if (state.step === "question" && state.index === 0) {
      try {
        localStorage.removeItem("lumlyn_gdpr_processing");
        localStorage.removeItem("lumlyn_accept_legal");
        sessionStorage.removeItem("lumlyn_restore_legal");
      } catch {}
      router.back();
      return;
    }
    dispatch({ type: "BACK" });
  }, [state.step, state.index, router]);

  const currentQuestion = state.step === "question" ? quizQuestions[state.index] : null;

  return (
    <>
      {/* LAYER 1: Lottie pe fundal (mobil min-h 940, desktop full viewport) */}
      <div
        aria-hidden
        className={
          "pointer-events-none z-0 " +
          "absolute inset-x-0 top-0 h-[940px] " + // mobile default (h fixă)
          "md:fixed md:inset-0 md:h-auto"
        }
      >
        <Lottie animationData={lottieData} loop autoplay />
      </div>

      {/* LAYER 1.5: Overlay blur + darken + opacitate, DOAR în afara frame-ului */}
      {rect.width > 0 && (
        <div className="fixed inset-0 z-10 pointer-events-none bg-black/50 backdrop-blur-[10px] opacity-100" aria-hidden>
         
        </div>
      )}

      {/* LAYER 2: Conținutul quiz-ului peste overlay (neafectat) */}
      <main className="relative z-20 w-full bg-transparent flex items-center justify-center min-h-[940px] md:min-h-screen">
        <section className="w-full max-w-[390px] p-4">
          <div
            ref={frameRef}
            aria-label="quiz frame"
            className="relative mx-auto w-full aspect-[195/422] border border-[#9747FF] rounded-[12px] bg-[rgba(249,246,255,0.90)] shadow-sm overflow-hidden"
          >
            <Button
              variant="back"
              onClick={handleBack}
              aria-label="Back"
              className="absolute left-[11px] top-[10px]"
            />

            {state.step === "question" && currentQuestion && (
              <div className="flex flex-col items-center w-full h-full">
                <div className="mt-[17px]">
                  <span aria-live="polite" className="text-[#666] text-base leading-[20px] font-bold">
                    {labels.progress(state.index + 1)}
                  </span>
                </div>

                <div className="mt-[132px] px-4">
                  <h2 id={`q-${currentQuestion.id}`} className="text-[#1A1A1A] text-lg font-bold text-center">
                    {currentQuestion.prompt}
                  </h2>
                </div>

                <div
                  role="radiogroup"
                  aria-labelledby={`q-${currentQuestion.id}`}
                  className="mt-[40px] flex flex-col items-center gap-5 px-4"
                >
                  {currentQuestion.options.map((opt, i) => {
                    const isSelected =
                      activating?.qid === currentQuestion.id
                        ? activating.oid === opt.id
                        : (state as any).answers?.[currentQuestion.id] === opt.id;

                    const onKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
                      const len = currentQuestion.options.length;
                      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                        e.preventDefault();
                        const next = (i + 1) % len;
                        setActiveIdx(next);
                        optionRefs.current[next]?.focus?.();
                      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                        e.preventDefault();
                        const prev = (i - 1 + len) % len;
                        setActiveIdx(prev);
                        optionRefs.current[prev]?.focus?.();
                      } else if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        handleAnswer(currentQuestion.id, opt.id);
                      }
                    };

                    return (
                      <Button
                        key={opt.id}
                        ref={(el: HTMLButtonElement | null): void => {
                          optionRefs.current[i] = el;
                        }}
                        variant="secondary"
                        selected={isSelected}
                        disabled={activating?.qid === currentQuestion.id}
                        className="!text-base focus-visible:ring-2 focus-visible:ring-[#9747FF] focus:outline-none"
                        onClick={() => handleAnswer(currentQuestion.id, opt.id)}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={i === activeIdx ? 0 : -1}
                        onKeyDown={onKeyDown}
                        data-qid={currentQuestion.id}
                        data-oid={opt.id}
                      >
                        {opt.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {state.step === "midcheck" && (
              <div className="flex flex-col items-center w-full h-full">
                <div className="mt-[275px] px-4">
                  <h2 className="text-[#1A1A1A] text-[24px] font-bold text-center">{midCheck.heading}</h2>
                  <p className="mt-[10px] text-[#000] text-[16px] font-normal text-center">
                    {midCheck.subheading}
                  </p>
                </div>
                <div className="mt-[40px]">
                  <Button variant="secondary" onClick={handleContinue} data-role="quiz_midcheck_continue">
                    {midCheck.cta}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
