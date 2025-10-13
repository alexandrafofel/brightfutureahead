// app/quiz/components/LPQuizOverlay.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import * as React from "react";
import LPQuiz from "./LPQuiz";

// definim aici tipurile pentru a evita importurile circulare
type ResultKey = "baby" | "v1" | "v2" | "v3" | "v4";

/**
 * Această componentă extinde LPQuizOverlay existent pentru a suporta fluxul
 * complet în overlay (teaser → run → outro → tips). Modelează starea internă
 * folosind o variabilă `mode` și transmite callback‑uri către etapele
 * ulterioare. Nu schimbă aspectul vizual al overlay‑ului sau al copiilor,
 * păstrând aceleași clase Tailwind și markup.
 */

type Props = {
  open: boolean;
  onClose?: () => void;
};

// Importăm lazy componentele run/outro/tips cu dynamic() pentru a evita SSR
const RunClient = dynamic(() => import("../run/RunClient"), { ssr: false });
const OutroClientLazy = dynamic(() => import("../outro/OutroClient"), { ssr: false });
const TipsClientLazy = dynamic(() => import("../tips/TipsClient"), { ssr: false });

export default function LPQuizOverlay({ open, onClose }: Props) {
  // modurile posibile ale overlay‑ului: teaser (LPQuiz), run, outro, tips
  const [mode, setMode] = React.useState<"teaser" | "run" | "outro" | "tips">(
    "teaser",
  );
  // păstrăm varianta pentru outro
  const [variant, setVariant] = React.useState<ResultKey>("v4");

  // când overlay‑ul devine deschis, resetăm modul la „teaser”
  React.useEffect(() => {
    if (open) {
      setMode("teaser");
    }
  }, [open]);

  // prevenim scroll‑ul paginii când overlay‑ul este deschis (ca în versiunea originală)
  React.useEffect(() => {
    if (open) {
      const prev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = prev;
      };
    }
  }, [open]);

  // log pentru a diagnostica modul curent în overlay
  React.useEffect(() => {
    if (open) {
      // eslint-disable-next-line no-console
      console.log(`[Overlay] mode=${mode}`);
    }
  }, [mode, open]);

  // callback apelat de StartQuiz
  const handleStart = React.useCallback(() => {
    setMode("run");
  }, []);

  // callback apelat la finalul quiz‑ului
  const handleComplete = React.useCallback((res: ResultKey) => {
    setVariant(res);
    setMode("outro");
  }, []);

  // callback apelat de componentele Outro pentru a trece la Tips
  const handleGoToTips = React.useCallback(() => {
    setMode("tips");
  }, []);

  // callback pentru Back din Run: revine la teaser
  const handleBack = React.useCallback(() => {
    setMode("teaser");
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lpquiz-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-hidden
        >
          {/* Card-ul propriu-zis */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-fit"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Randăm componenta corespunzătoare în funcție de mod */}
            {mode === "teaser" && <LPQuiz onStart={handleStart} />}
            {mode === "run" && (
              <RunClient
                onComplete={handleComplete}
                onBack={handleBack}
              />
            )}
            {mode === "outro" && (
              <OutroClientLazy variant={variant} onGoToTips={handleGoToTips} />
            )}
            {mode === "tips" && <TipsClientLazy />}

            {/* (opțional) buton close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-10 right-2 rounded-full bg-white/90 border shadow px-2 py-1 text-xs"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
