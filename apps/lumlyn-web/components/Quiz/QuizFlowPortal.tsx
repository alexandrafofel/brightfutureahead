"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import LPQuizOverlay from "@/app/quiz/components/LPQuizOverlay";
import QuizRunPage from "@/app/quiz/run/QuizRunPage";

export type Phase = "closed" | "overlay" | "quiz";

type Props = {
  phase: Phase;
  onCloseOverlay: () => void; // overlay -> quiz
  onCloseQuiz: () => void;    // quiz -> closed
  zIndex?: number;
  hideBlur?: boolean;
};

export default function QuizFlowPortal({
  phase,
  onCloseOverlay,
  onCloseQuiz,
  zIndex = 1050,
  hideBlur = false,
}: Props) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // body scroll lock când e deschis
  React.useEffect(() => {
    if (phase === "closed") return;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (sbw > 0) body.style.paddingRight = `${sbw}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, [phase]);

  if (!mounted || phase === "closed") return null;

  const layer = (
    <div className="fixed inset-0" style={{ zIndex }}>
      <div
        className="absolute inset-0 bg-black/50"
        style={hideBlur ? undefined : { backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
        onClick={phase === "overlay" ? onCloseOverlay : onCloseQuiz}
        aria-hidden="true"
      />
      <div className="absolute inset-0">
        {phase === "overlay" ? (
          <LPQuizOverlay open onClose={onCloseOverlay} />
        ) : (
          <QuizRunPage onClose={onCloseQuiz} />
        )}
      </div>
    </div>
  );

  return createPortal(layer, document.body);
}
