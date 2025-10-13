// app/quiz/components/LPQuizOverlay.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import LPQuiz from "./LPQuiz";

type Props = {
  open: boolean;
  onClose?: () => void;
};

export default function LPQuizOverlay({ open, onClose }: Props) {
  // oprește scroll-ul paginii când overlay-ul e deschis
  React.useEffect(() => {
    if (open) {
      const prev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      return () => { document.documentElement.style.overflow = prev; };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lpquiz-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xl" // ~20% dim + blur
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
            <LPQuiz />
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
