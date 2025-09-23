"use client";

import React from "react";
import s from "./WorkInProgress.module.css";
import WorkInProgressImage from "./WorkInProgressImage";
import Link from "next/link";

export default function WorkInProgressPage() {
  return (
    <main className={s.FrameRoot} aria-labelledby="wip-title">
      {/* Canvas 1440×1024 (responsive scale) */}
      <div className={s.Canvas}>
        {/* HEADER – ilustrație */}
        <header className={s.hoverGroup} aria-hidden="true">
          <div className={s.BoxWorkInProgressImage}>
            <WorkInProgressImage />
          </div>
        </header>

        {/* MAIN – text frame */}
        <section className={s.AllText}>
          {/* Headline, “mai înghesuit” */}
          <div className={s.HeadingFrame}>
            <h1 id="wip-title" className={s.Heading}>
              This space is still in progress.
              <br />
              Soon, it will bring you something warm and useful — designed with
              care, calm, and science.
            </h1>
          </div>

          {/* Paragraf – “înghesuit” ca în a doua poză */}
          <div className={s.FrameDetails}>
            <p className={s.Details}>
              Calm in the making — <strong>quiz, chatbot, and personalised
              guidance to support your child</strong>, and to help <strong>parents,
              educators, and therapists</strong> with science and care. We’re also
              creating <strong>storybooks for children</strong> — gentle, realistic
              tales about rare but important moments like adoption or life with a
              twin. <strong>Coming Oct 31, 2025.</strong>
            </p>
          </div>

          {/* CTA */}
          <div className={s.BOXcomingSoonDescription} role="status" aria-live="polite">
            Coming Oct 31, 2025
          </div>
        </section>

        {/* FOOTER */}
        <footer className={s.FrameFooter}>
          <span>© 2025 Lumlyn ·&nbsp;</span>
          <Link href="/terms">Terms & Conditions</Link>
          <span>&nbsp;·&nbsp;</span>
          <Link href="/policy">Privacy Policy</Link>
        </footer>
      </div>
    </main>
  );
}
