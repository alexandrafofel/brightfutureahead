// app/(marketing)/components/work-in-progress/WorkInProgress.tsx
"use client";

import React from "react";
import { Footer } from "@/components/Footer/Footer";
import { Logo } from "@/components/Logo/Logo";
import { inProgress } from "../work-in-progress/messeges/en";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import { Button } from "@/components/Button/button";
import dynamic from "next/dynamic";

// Lazy-load Lottie doar pe client
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Respectă preferința utilizatorilor pentru „reduce motion”
function usePrefersReducedMotion() {
  const [prefers, setPrefers] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefers(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return prefers;
}

export default function WorkInProgressPage() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Încărcăm JSON-ul Lottie din /public/hero-bg.json (același ca în Hero)
  const [animData, setAnimData] = React.useState<any>(null);
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/hero-bg.json", { cache: "force-cache" });
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) setAnimData(json);
      } catch {
        // fallback static dacă eșuează
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    // ===== OUTER WRAPPER full-bleed (fundal animat) =====
    <div className="relative z-0 w-full min-h-screen overflow-hidden bg-transparent text-[#333]">
      {/* Lottie full-bleed pe tot viewport-ul */}
      {!prefersReducedMotion && animData ? (
        <div className="pointer-events-none select-none fixed inset-0 z-0 w-screen h-screen">
          <Lottie
            animationData={animData}
            loop
            autoplay
            aria-hidden="true"
            className="w-full h-full"
            rendererSettings={{
              // „cover” (umple ecranul ca un background)
              preserveAspectRatio: "xMidYMid slice",
            }}
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 w-screen h-screen"
          style={{
            background: "linear-gradient(180deg, #FFF9F5 0%, #ECFDF5 100%)",
          }}
        />
      )}

      {/* Overlay soft pentru contrast peste animație */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-10 w-screen h-screen"
        style={{ background: "rgba(249,246,255,0.70)" }}
      />

      {/* ===== INNER CONTAINER (conținutul paginii) ===== */}
      <section className="relative z-20 min-h-screen flex flex-col items-center justify-center">
        <div
          aria-label="desktop frame"
          className="relative flex flex-col items-center xl:w-[1440px] xl:h-[1024px] xl:gap-1"
        >
          <header aria-labelledby="Lumlyn Logo" className="mb-[20px]">
            <Logo />
          </header>

          <nav aria-label="Primary nav Desktop" className="hidden xl:block">
            <Button
              variant="back"
              className="hidden xl:block xl:!mx-0 xl:!self-auto xl:left-8 xl:top-8 fixed"
            >
              <span className="sr-only">Back</span>
            </Button>
          </nav>

          <nav aria-label="Primary nav mobile" className="xl:hidden absolute top-[15px] right-[30px]">
                     <MobileMenu />
                   </nav>

          <main
            aria-labelledby="wip-details"
            className="text-center flex flex-col items-center gap-8"
          >
            {/* Desktop copy */}
            <div
              aria-label="desktop text"
              className="hidden xl:text-2xl xl:flex xl:flex-col xl:items-center xl:gap-5 xl:w-[720px] xl:mx-auto"
            >
              <p aria-label="inProgress desktop" className="font-bold text-2xl">
                {inProgress.status}
              </p>
              <p
                aria-label="inProgress desktop"
                className="font-bold text-2xl mb-[20px]"
              >
                {inProgress.promise}
              </p>
              <p
                aria-label="inProgress description desktop"
                className="xl:text-lg xl:w-[680px] mx-auto mb-[70px]"
              >
                {inProgress.description}
              </p>
            </div>

            {/* Mobile copy */}
            <div
              aria-label="mobile text"
              className="xl:hidden flex flex-col items-center gap-5 mx-auto"
            >
              <p
                aria-label="status mobile"
                className="font-bold text-xl w-[330px]"
              >
                {inProgress.statusMob}
              </p>
              <p
                aria-label="promise mobile"
                className="font-bold text-xl w-[330px] mb-[20px]"
              >
                {inProgress.promiseMob}
              </p>
              <p
                aria-label="description mobile"
                className="xl:text-lg w-[340px] mx-auto mb-[70px]"
              >
                {inProgress.descriptionMob}
              </p>
            </div>

            <p
              aria-label="release"
              className="
                gap-3 w-[200px] h-[64px] rounded-full border-[#6C63FF]
                bg-gradient-to-b from-[#A8EDE1] to-[#52D6C5]
                text-base text-black text-center justify-center items-center
                py-5 px-3 mb-[50px] xl:font-medium font-semibold
              "
            >
              {inProgress.release}
            </p>
          </main>

          <footer role="contentinfo" className="text-center mt-40">
            <Footer />
          </footer>
        </div>
      </section>
    </div>
  );
}
