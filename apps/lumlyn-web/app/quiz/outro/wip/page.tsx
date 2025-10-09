"use client";

// Work‑in‑Progress page shown after the general quiz outro. This page attempts
// to import the existing WorkInProgress component from the codebase. If that
// import fails (due to the module not existing or export mismatches), a
// minimal fallback component is used instead. The import is performed
// dynamically to ensure compatibility with the Next.js App Router and to
// disable server‑side rendering for this component.

import dynamic from "next/dynamic";
import * as React from "react";

const WorkInProgressPage = dynamic(
  () =>
    import("@/components/work-in-progress/WorkInProgress").then((mod: any) => {
      const component = mod.default || mod.WorkInProgressPage || mod.WorkInProgress;
      if (component) {
        return component;
      }
      return () => (
        <div className="min-h-screen flex items-center justify-center text-center px-6">
          Work in progress
        </div>
      );
    }),
  { ssr: false }
);

export default function QuizWorkInProgressPage() {
  return <WorkInProgressPage />;
}