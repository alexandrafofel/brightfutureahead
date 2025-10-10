"use client";

/**
 * Error boundary for /quiz/tips
 * - Catches runtime errors in this segment and shows a friendly fallback.
 * - Provides a Reset button that re-renders the route segment.
 * - Offers a link back to restart the quiz.
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button/button";

export default function TipsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  const router = useRouter();

  React.useEffect(() => {
    console.error("[/quiz/tips] error boundary:", error);
  }, [error]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 py-10">
      <section
        className="
          w-full max-w-[560px] rounded-[12px] border-[3px] border-[#9747FF]
          bg-[rgba(249,246,255,0.90)] p-6 text-center
        "
        aria-labelledby="tips-error-title"
      >
        <h1
          id="tips-error-title"
          className="text-[#1A1A1A] font-bold text-[22px] leading-8"
        >
          Something went wrong loading your calm tip
        </h1>

        <p className="mt-2 text-[#111] text-[18px] leading-7">
          This is on us. Let’s try that again or restart the quiz.
        </p>

        <div className="mt-5 flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={() => reset()}>
            Try again
          </Button>
          <Button variant="primary" onClick={() => router.push("/quiz/run")}>
            Restart quiz
          </Button>
        </div>

        {process.env.NODE_ENV !== "production" && (
          <p className="mt-4 text-xs text-[#667085]">
            <span className="font-semibold">Debug:</span>{" "}
            {error?.message || "Unknown error"}
            {error?.digest ? ` — ${error.digest}` : null}
          </p>
        )}
      </section>
    </main>
  );
}
