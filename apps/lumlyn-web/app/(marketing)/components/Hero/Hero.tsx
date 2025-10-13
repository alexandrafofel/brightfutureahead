"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/Button/button";
import { LogoStack } from "@/components/Logo/LogoStack";
import { Logo } from "@/components/Logo/Logo";
import { Footer } from "@/components/Footer/Footer";
import { FeatureList } from "./FeatureList";
import { hero } from "./messages/en";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import * as React from "react";
import LPQuizOverlay from "@/app/quiz/components/LPQuizOverlay";
import dynamic from "next/dynamic";
import QuizRunPage from "@/app/quiz/run/QuizRunPage";

const MotionButton = motion(Button);
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });



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

export default function Hero(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Load JSON din /public/hero-bg.json
  const [animData, setAnimData] = React.useState<any>(null);
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/hero-bg.json", { cache: "force-cache" });
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) setAnimData(json);
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    // OUTER full-bleed + stacking context
    <div className="relative z-0 w-full min-h-screen overflow-hidden bg-transparent text-[#344054]">
      {/* Lottie full-bleed (NU mai folosim z negativ) */}
      {!prefersReducedMotion && animData ? (
        <div className="pointer-events-none select-none fixed inset-0 z-0 w-screen h-screen">
          <Lottie
            animationData={animData}
            loop
            autoplay
            aria-hidden="true"
            className="w-full h-full"
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice", // cover
              // renderer implicit: 'svg'
            }}
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 w-screen h-screen"
          style={{ background: "linear-gradient(180deg, #FFF9F5 0%, #ECFDF5 100%)" }}
        />
      )}

      {/* Overlay pentru contrast (peste Lottie, sub conținut) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-10 w-screen h-screen"
        style={{ background: "rgba(249,246,255,0.70)" }}
      />

      {/* INNER container (conținut) */}
      <div className="relative z-20 mx-auto w-full flex flex-col xl:max-w-[1440px] xl:min-h-[1024px]">
        <a href="#main" className="sr-only">Skip to main content</a>

        <header
          role="banner"
          className="
            w-full px-4
            flex justify-center xl:justify-start
            xl:absolute xl:left-[68px] xl:top-[25px]
            xl:w-[192.188px] xl:h-[247px]
          "
          aria-label="Lumlyn home"
        >
          <section className="hidden xl:block"><LogoStack /></section>
          <section className="xl:hidden mt-[11px]"><Logo /></section>

          <nav aria-label="Primary nav mobile" className="xl:hidden absolute top-[15px] right-[30px]">
            <MobileMenu />
          </nav>

          <nav aria-label="Primary Nav Desktop" className="hidden xl:flex xl:items-center xl:justify-end">
            <Button asChild variant="secondary" className="whitespace-nowrap xl:absolute xl:left-[700px] xl:top-[30px]">
              <Link href="/about-us" aria-label="Learn about the Lumlyn team">{hero.nav.aboutUs}</Link>
            </Button>
            <Button asChild variant="secondary" className="whitespace-nowrap xl:absolute xl:left-[1026px] xl:top-[30px]">
              <Link href="/about-app" aria-label="Learn about the Lumlyn app">{hero.nav.aboutApp}</Link>
            </Button>
          </nav>
        </header>

        <main
          id="main"
          className="flex-1 flex items-center justify-center px-4 text-center"
        >
          {/* Desktop card */}
          <motion.section
            aria-labelledby="hero-title"
            aria-describedby="hero-reassurance"
            className="
              hidden
              xl:w-full
              xl:w-[720px] xl:h-[531px] xl:max-w-3xl xl:text-center xl:space-y-6 xl:p-8 xl:flex xl:flex-col xl:items-center
              xl:rounded-[12px] xl:border-[3px] xl:border-[rgba(151,71,255,0.40)]
              xl:bg-white/60 backdrop-blur-sm
              xl:shadow-[0_4px_16px_0_rgba(0,0,0,0.15)]
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1
              id="hero-title"
              className="text-3xl md:text-4xl font-bold leading-tight"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ color: "#111", textAlign: "center", fontSize: "28px", fontWeight: 700, lineHeight: "48px" }}
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{ color: "#374151", textAlign: "center", fontSize: "20px", fontWeight: 500, lineHeight: "30px" }}
            >
              {hero.subheadline}
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.6 }}>
              <FeatureList title={hero.benefitsTitle} items={hero.benefits} />
            </motion.div>

            <motion.p id="hero-reassurance" className="text-sm text-gray-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
              {hero.reassurance}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }}>
              <Button variant="primary" onClick={() => setOpen(true)}>{hero.cta}</Button>
            </motion.div>
          </motion.section>

          {/* Mobile */}
          <motion.section className="xl:hidden flex flex-col items-center justify-center gap-3 text-[#111]">
            <motion.h1 className="w-[280px] font-bold text-lg leading-[34px]">
              {hero.headlineMob}
            </motion.h1>

            <motion.p className="w-[334px] h-[55px] shrink-0 text-center text-base leading-[28px]">
              {hero.subheadlineMob}
            </motion.p>

        {/* NU mai înfășura Button într-un <motion.button> */}
            <motion.div>
              <MotionButton
                variant="primary"
                className="!text-[xl] !font-semibold !leading-[24px] mt-5 gap-[10px]"
                onClick={() => setOpen(true)}
                layout
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -1 }}
              >
                {hero.ctaMob}
              </MotionButton>
            </motion.div>

            <motion.article className="flex flex-col items-center">
              <p className="w-[320px] h-[34px] mb-[10px] mt-[10px] text-center text-[#9747FF] text-lg font-bold leading-[34px]">
                {hero.benefitsTitleMob}
              </p>
              <div className="flex flex-col items-center justify-center mb-[15px] leading-[28px] text-base font-normal text-center">
                {hero.benefitsMob.map((benefit, index) => (
                  <p key={index} className="text-center">{benefit}</p>
                ))}
              </div>

              {/* typo fix: h-[55px] și shrink-0 */}
              <p className="w-[277px] h-[55px] mb-[15px] shrink-0 text-[#6CA9F6] text-center text-base font-semibold leading-[28px]">
                {hero.reassuranceMob}
              </p>
            </motion.article>

            <motion.div aria-hidden="true">
              <div className="w-[300px] h-[56px] shrink-0 justify-center items-center flex flex-col mb-3 rounded-[12px] bg-gradient-to-r from-[#9E8CF6] to-[#C9BDF9] shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]">
                <h2 className="text-[#111] text-sm font-bold leading-[14px]">
                  {hero.comingMob[0].tantrumsTitle}
                </h2>
                <p className="text-[#111] text-sm font-normal leading-[14px]">
                  {hero.comingMob[0].tantrumsDescr}
                </p>
              </div>

              <div className="w-[300px] h-[56px] shrink-0 justify-center items-center flex flex-col mb-5 rounded-[12px] bg-gradient-to-r from-[#9E8CF6] to-[#C9BDF9] shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]">
                <h2 className="text-[#111] text-sm font-bold leading-[14px]">
                  {hero.comingMob[1].sleepTitle}
                </h2>
                <p className="text-[#111] text-sm font-normal leading-[14px]">
                  {hero.comingMob[1].sleepDescr}
                </p>
              </div>
            </motion.div>
          </motion.section>
          
          <LPQuizOverlay open={open} onClose={() => setOpen(false)} />
        </main>

        <footer role="contentinfo" className="px-4 text-center mb-5"><Footer /></footer>
      </div>
    </div>
  );
}
