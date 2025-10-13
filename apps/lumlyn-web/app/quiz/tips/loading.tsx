// apps/lumlyn-web/app/quiz/tips/loading.tsx
// Lightweight skeleton while Lottie + tip data initialize.

import * as React from "react";

export default function TipsLoading(): JSX.Element {
  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[390px] animate-pulse">
        {/* Headline skeletons */}
        <div className="h-6 w-3/4 mx-auto rounded bg-black/10" />
        <div className="mt-2 h-5 w-5/6 mx-auto rounded bg-black/10" />

        {/* Card skeleton */}
        <div className="mt-4 w-[375px] h-[273px] mx-auto rounded-[12px] bg-black/5">
          <div className="h-full w-full flex items-center justify-center">
            <div className="space-y-2 w-[85%]">
              <div className="h-4 w-full rounded bg-black/10" />
              <div className="h-4 w-5/6 rounded bg-black/10" />
              <div className="h-4 w-4/6 rounded bg-black/10" />
            </div>
          </div>
        </div>

        {/* Email skeleton */}
        <div className="mt-6 w-full rounded-[12px] bg-black/5 p-4">
          <div className="h-4 w-12 rounded bg-black/10" />
          <div className="mt-2 h-10 w-full rounded-[12px] bg-black/10" />
          <div className="mt-2 h-10 w-2/3 mx-auto rounded-[12px] bg-black/10" />
        </div>

        {/* Footer placeholder */}
        <div className="mt-[52px] h-6 w-1/2 mx-auto rounded bg-black/10" />
      </div>
    </main>
  );
}
