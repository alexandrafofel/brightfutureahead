"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button/button";
import { useMediaQuery } from "@/components/Quiz/useMediaQuery";
import MobileMenu from "@/components/MobileMenu/MobileMenu";  
import heroDesk from "@/assets/lottie/hero-bg.json";
import heroMob from "@/assets/lottie/hero-bg-mob.json";

// logica quiz existentă (păstrează importurile reale din proiectul tău)
import { quizReducer, createInitialState } from "../lib/quizReducer";
import { quizQuestions, midCheck, labels } from "../messages/quiz-options";

// ✅ persist answers helpers (nou)
import {
  ensureAnswers,
  mergeAnswer,
  saveAnswers,
  clearAnswers,
} from "@/functions/persistQuizAnswers";

type ResultKey = "baby" | "v1" | "v2" | "v3" | "v4";

/** Detectează dacă Q2 (vârsta) este 0–2 (ani/luni), tolerând formate diferite. */
function isAge0to2(answers: Record<string, any> | undefined): boolean {
  if (!answers) return false;
  const q2Id = "Q2";
  const selectedOptId = answers[q2Id];
  if (!selectedOptId) return false;

  const q2 = quizQuestions.find((q) => q.id === q2Id);
  const opt = q2?.options?.find((o) => o.id === selectedOptId);

  const text = [opt?.label, (opt as any)?.value, (opt as any)?.id]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return /\b0\s*[-–to_]\s*2\b/.test(text) || /\b0-?2m\b/.test(text) || /\bunder\s*2\b/.test(text);
}

export default function QuizRunPage(): JSX.Element {

  const router = useRouter();

  const [state, dispatch] = React.useReducer(
    quizReducer as React.Reducer<any, any>,
    createInitialState()
  );

  // pregătim storage-ul (nu scrie nimic dacă există deja)
  React.useEffect(() => {
    ensureAnswers();
  }, []);

  const optionRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIdx, setActiveIdx] = React.useState(0);

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

  React.useEffect(() => {
    (window as any)?.posthog?.capture?.("quiz_start");

    try {
      clearAnswers();
      ensureAnswers();
    } catch {}
    dispatch({ type: "START" });
  }, []);

  // La completare: baby -> outro?variant=baby; altfel -> outro?variant=v1 (lanț din en.ts)
  React.useEffect(() => {
    if (state.step === "complete") {
      try {
        // snapshot final pentru tips
        saveAnswers((state as any).answers ?? {});
      } catch {}

      const answers = (state as any).answers as Record<string, any> | undefined;
      const isBaby = isAge0to2(answers);

      (window as any)?.posthog?.capture?.("quiz_complete", { is_baby: isBaby });

      const variant: ResultKey = isBaby ? "baby" : "v1";
      router.replace(`/quiz/outro?variant=${variant}`);
    }
  }, [state.step, router, state]);

  // Focus pe opțiunea selectată
  React.useEffect(() => {
    if (state.step !== "question") return;
    const q = quizQuestions[state.index];
    const selectedId = (state as any).answers?.[q.id];
    const idx = Math.max(0, q.options.findIndex((o) => o.id === selectedId));
    setActiveIdx(idx);
    requestAnimationFrame(() => optionRefs.current[idx]?.focus?.());
  }, [state]);

  const [activating, setActivating] = React.useState<{ qid: string; oid: string } | null>(null);
  const ANSWER_DELAY = 250;

  const handleAnswer = React.useCallback((qid: string, oid: string) => {
    setActivating({ qid, oid });
    (window as any)?.posthog?.capture?.("quiz_answer_click", { qid, oid });

    window.setTimeout(() => {
      (window as any)?.posthog?.capture?.("quiz_answer", { qid, oid });

      // ✅ persistăm incremental răspunsul (local/session storage)
      try {
        mergeAnswer(qid, oid);
      } catch {}

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
        // curățăm doar flag-urile, nu răspunsurile (ca să poată reveni)
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
   <main className="relative z-20 w-full bg-transparent flex items-center justify-center min-h-[940px] xl:right-[150px] md:min-h-screen">
        <section className="w-full max-w-[390px] p-4">
          <nav aria-label="Primary nav mobile" className="absolute top-[15px] right-[30px]">
            <MobileMenu />
          </nav>         
          <div
            ref={frameRef}
            aria-label="quiz frame"
            className="
              relative mx-auto w-full aspect-[195/422] 
              border border-[#9747FF] rounded-[12px] 
              bg-[rgba(249,246,255,0.90)] shadow-sm overflow-hidden
              xl:w-[640px] xl:h-[460px] 
            "
          >
            {/* Back */}
            <Button
              variant="back"
              onClick={handleBack}
              aria-label="Back"
              className="absolute left-[11px] top-[10px]"
            />

            {/* Questions */}
            {state.step === "question" && currentQuestion && (
              <div className="flex flex-col items-center w-full h-full">
                <div className="mt-[17px]">
                  <span
                    aria-live="polite"
                    className="text-[#666] text-base leading-[20px] font-bold"
                  >
                    {labels.progress(state.index + 1)}
                  </span>
                </div>

                <div className="mt-[132px] xl:mt-[37px] px-4">
                  <h2
                    id={`q-${currentQuestion.id}`}
                    className="text-[#1A1A1A] text-lg font-bold text-center"
                  >
                    {currentQuestion.prompt}
                  </h2>
                </div>

                <div
                  role="radiogroup"
                  aria-labelledby={`q-${currentQuestion.id}`}
                  className="mt-[40px] xl:mt-[23px] flex flex-col items-center gap-5 px-4"
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

            {/* Mid-check */}
            {state.step === "midcheck" && (
              <div className="flex flex-col items-center w-full h-full">
                <div className="mt-[275px] px-4">
                  <h2 className="text-[#1A1A1A] text-[24px] font-bold text-center">
                    {midCheck.heading}
                  </h2>
                  <p className="mt-[10px] text-[#000] text-[16px] font-normal text-center">
                    {midCheck.subheading}
                  </p>
                </div>
                <div className="mt-[40px]">
                  <Button
                    variant="secondary"
                    onClick={handleContinue}
                    data-role="quiz_midcheck_continue"
                  >
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
