// app/quiz/components/LPQuiz.tsx
"use client";

import * as React from "react";
import { Nunito_Sans } from "next/font/google";
import StartQuiz from "./StartQuiz";
import { lpQuiz } from "../messages/en"; // { title, explanation, message }
import { FooterLP } from "@/components/Quiz/FooterLP";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function LPQuiz() {
  return (
    <section className="full-w flex items-center justify-center mt-[200px]">
      {/* Card / Frame */}
      <div
        className={[
          "inline-flex flex-col items-center justify-start",
          "border border-[#9747FF] bg-[rgba(249,246,255,0.90)] rounded-[12px]",
          "shadow-[0_8px_24px_0_rgba(0,0,0,0.10)]",
          "px-[31px] pr-[32px]", // (31 / 32) exact din specificație
          "pt-[10px]", // 10px de top până la Title
          "pb-[15px]", // 15px până la Footer (dacă îl pui în afara acestui card)
          "max-w-[327px]  max-h-[448px] w-full",
          "aspect-[195/422]",
          nunito.className,
        ].join(" ")}
      >
        {/* Title */}
        <h1
          className="w-[327px] text-center text-[#111] font-bold"
          style={{ fontFamily: '"Nunito Sans", ui-sans-serif, system-ui', lineHeight: "30px", fontSize: 24 }}
        >
          {lpQuiz.title}
        </h1>

        {/* Explanation (la 25px sub title) */}
        <p
          className="mt-[25px] w-[327px] text-center text-[#333] font-semibold"
          style={{ fontFamily: '"Nunito Sans", ui-sans-serif, system-ui', lineHeight: "24px", fontSize: 16 }}
        >
          {lpQuiz.explanation}
        </p>

        {/* Message (la 10px sub explanation) */}
        <p
          className="mt-[10px] w-[324px] text-center text-[#9A7BD9] font-normal"
          style={{ fontFamily: '"Nunito Sans", ui-sans-serif, system-ui', lineHeight: "18px", fontSize: 13 }}
          aria-live="polite"
        >
          {lpQuiz.message}
        </p>

        {/* Start Quiz + CheckLegal (înăuntrul StartQuiz) – la 32px sub message */}
        <div className="mt-[32px] w-full flex flex-col items-center">
          {/* StartQuiz conține CheckLegal și dezactivează butonul până sunt bifele ok.
              Navighează la /quiz (app/quiz/page.tsx) când totul e valid. */}
          <StartQuiz redirectTo="/quiz" className="w-full flex flex-col items-center" />
        </div>
        <footer>
            <FooterLP/>
        </footer>
      </div>
    </section>
  );
}
