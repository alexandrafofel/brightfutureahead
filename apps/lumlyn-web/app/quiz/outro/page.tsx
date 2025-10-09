"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button/button";
import { motion, useReducedMotion } from "framer-motion";

function AnimatedBackground() {
  const reduceMotion = useReducedMotion();
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#9747FF]"
    >
      {/* Strat static subtil (fallback pentru reduced motion) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F9F6FF] via-[#F4EDFF] to-[#F9F6FF]" />

      {!reduceMotion && (
        <>
          {/* Blob 1 (mov/lila) */}
          <motion.div
            initial={{ x: -120, y: -80, scale: 1, opacity: 0.45 }}
            animate={{ x: 40, y: 20, scale: 1.15, opacity: 0.5 }}
            transition={{ duration: 16, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute w-[420px] h-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(40% 40% at 50% 50%, rgba(154, 123, 217, 0.55) 0%, rgba(154, 123, 217, 0.0) 70%)",
              top: "-10%",
              left: "-8%",
              filter: "blur(28px)",
            }}
          />

          {/* Blob 2 (roz) */}
          <motion.div
            initial={{ x: 120, y: 80, scale: 1, opacity: 0.35 }}
            animate={{ x: -30, y: 0, scale: 1.1, opacity: 0.4 }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute w-[520px] h-[520px] rounded-full"
            style={{
              background:
                "radial-gradient(40% 40% at 50% 50%, rgba(247, 137, 167, 0.45) 0%, rgba(247, 137, 167, 0.0) 70%)",
              bottom: "-14%",
              right: "-12%",
              filter: "blur(30px)",
            }}
          />

          {/* Blob 3 (albastru) */}
          <motion.div
            initial={{ x: 40, y: -40, scale: 0.9, opacity: 0.35 }}
            animate={{ x: -20, y: 40, scale: 1.05, opacity: 0.42 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute w-[480px] h-[480px] rounded-full"
            style={{
              background:
                "radial-gradient(40% 40% at 50% 50%, rgba(107, 148, 255, 0.35) 0%, rgba(107, 148, 255, 0.0) 70%)",
              top: "28%",
              left: "50%",
              transform: "translateX(-50%)",
              filter: "blur(26px)",
            }}
          />
        </>
      )}
    </div>
  );
}

export default function QuizOutroPage() {
  const router = useRouter();
  const handleContinue = () => router.push("/quiz/outro/wip");

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center px-6 py-10">
      <AnimatedBackground />

      <div className="relative z-10 text-center">
        <h2 className="text-xl font-bold text-[#1A1A1A]">
          It’s okay. You’ve taken an important step. In under a minute, you’ll get a gentle tip, validated by experts.
        </h2>
        <div className="mt-8">
          <Button
            variant="primary"
            onClick={handleContinue}
            data-role="quiz_outro_continue"
          >
            Show me the gentle step
          </Button>
        </div>
      </div>
    </main>
  );
}
