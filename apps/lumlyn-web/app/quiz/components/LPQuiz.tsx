// app/quiz/components/LPQuiz.tsx
"use client";

import * as React from "react";
import StartQuiz from "./StartQuiz";
import { Logo } from "@/components/Logo/Logo";
import { lpQuiz } from "../messages/en";
import { FooterLP } from "@/components/Quiz/FooterLP";

/**
 * LPQuiz – card-ul de “teaser” pentru quiz, folosit pe landing sau în overlay.
 * - Fără prop `redirectTo`: StartQuiz navighează forțat la `/quiz/run`.
 * - Copy aliniat cu content-hierarchy (headline, subheadline).
 * - Tailwind corect (fără `hidden:xl`, fără dubluri `w-[...] w-[...]`).
 * - A11y: headings, descrieri, role=region, landmark clar.
 *
 * Această versiune acceptă opțional o funcție `onStart` care este transmisă
 * mai departe către StartQuiz. Atunci când este prezentă, StartQuiz va apela
 * această funcție în loc să folosească `router.push` pentru a naviga la ruta
 * “/quiz/run”. Această schimbare este pur logică și nu afectează markup-ul
 * sau stilurile vizibile.
 */

export type LPQuizProps = {
  /**
   * Funcție apelată când utilizatorul pornește quiz-ul.
   * Dacă nu este definită, StartQuiz va naviga normal la ruta implicită.
   */
  onStart?: () => void;
};

export default function LPQuiz({ onStart }: LPQuizProps) {
  const headlineId = React.useId();
  const descId = React.useId();

  return (
    <section
      role="region"
      aria-labelledby={headlineId}
      aria-describedby={descId}
      className="relative mx-auto xl:w-[720px] xl:h-[531px] w-[340px] h-[448px] rounded-2xl shadow-xl border bg-white/90 backdrop-blur p-6 xl:p-8"
      data-role="lp_quiz_card"
    >
      {/* Badge/logo (opțional): ascuns pe ecrane foarte mici */}
      <div
        aria-label="Lumlyn-logo"
        className="mb-3 hidden xl:flex items-center gap-2"
      >
        <div className="h-8 w-8 rounded-full bg-[#C9BDF9]" aria-hidden>
          <Logo />
        </div>
        <span className="text-sm text-black/60">Lumlyn · Early access</span>
      </div>

      {/* Header pentru mobile */}
      <header
        aria-label="header mobile"
        className="max-w-[400px] w-full mx-auto text-center xl:text-left overflow-hidden"
      >
        <h1
          id={headlineId}
          className="break-words text-2xl leading-[30px] font-bold text-[#111] xl:text-[28px] xl:leading-8"
        >
          {lpQuiz.titleMob}
        </h1>

        <p
          id={descId}
          className="mt-5 break-words text-base leading-[24px] font-semibold text-[#333] xl:text-[16px] xl:leading-6"
        >
          {lpQuiz.explanationMob}
        </p>
      </header>

      {/* Header pentru desktop */}
      <header
        aria-label="header desktop"
        className="hidden xl:max-w-[720px] xl:w-full xl:mx-auto xl:text-center xl:text-left xl:overflow-hidden"
      >
        <h1
          id={headlineId}
          className="break-words text-2xl leading-[30px] font-bold text-[#111] xl:text-[28px] xl:leading-8"
        >
          {lpQuiz.title}
        </h1>

        <p
          id={descId}
          className="mt-5 break-words text-base leading-[24px] font-semibold text-[#333] xl:text-[16px] xl:leading-6"
        >
          {lpQuiz.explanation}
        </p>
      </header>

      <div className="mt-2">
        <p className="text-xs font-normal leading-[18px] text-[#9A7BD9] xl:max-w-[560px]">
          {lpQuiz.messageMob}
        </p>
      </div>

      {/* CTA principal – pornește fluxul pe /quiz/run prin StartQuiz */}
      <div className="mt-10 flex w-full justify-center xl:justify-start">
        <StartQuiz
          className="w-full flex flex-col items-center"
          minutes={1}
          // Notă: StartQuiz gestionează singur legal/GDPR + dezactivează CTA până la bife
          onStart={onStart}
        />
      </div>

      {/* Microcopy despre email & GDPR – informativ (StartQuiz conține componenta legală efectivă) */}
      <div className="absolute bottom-[0px] left-0 w-full text-center xl:text-left text-xs leading-[18px] text-black/60">
        <FooterLP />
      </div>
    </section>
  );
}
