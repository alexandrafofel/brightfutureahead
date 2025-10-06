// app/(marketing)/components/Hero/Hero.tsx
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




export default function Hero(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  return (
    
    <div
      className="
        min-h-screen bg-[var(--Background-lavanda,_rgba(249,246,255,0.90))] text-[#344054]
        relative mx-auto w-full
        flex flex-col
        xl:max-w-[1440px] xl:min-h-[1024px]
      "
    >
      {/* Skip link pentru keyboard users */}
      <a
        href="#main"
        className="sr-only"
      >
        Skip to main content
      </a>

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
        <section
          className="hidden xl:block"
        >
          <LogoStack/>
        </section>
        
        <section
        className="xl:hidden mt-[11px]"
        >
          <Logo/>
        </section>

        <nav 
          aria-label="Primary nav mobile"
          className="xl:hidden absolute top-[15px] right-[30px]"
        >
          <MobileMenu />
        </nav> 

        <nav
          aria-label="Primary Nav Desktop"
          className="hidden xl:flex xl:items-center xl:justify-end" 
        >

          {/* Secondary */}
          <Button
            asChild
            variant="secondary"
            className="whitespace-nowrap xl:absolute xl:left-[700px] xl:top-[30px]"
          >
            <Link href="/about-us" aria-label="Learn about the Lumlyn team">
              {hero.nav.aboutUs}
            </Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="whitespace-nowrap xl:absolute xl:left-[1026px] xl:top-[30px]"
          >
            <Link href="/about-app" aria-label="Learn about the Lumlyn app">
              {hero.nav.aboutApp}
            </Link>
          </Button>
        </nav>

      </header>

      <main 
        id="main"   
        className="
          flex-1
          flex
          items-center 
          justify-center 
          px-4
          text-center 
        "
        >
        <motion.section
          aria-labelledby="hero-title"
          aria-describedby="hero-reassurance"
          className="
          hidden
          xl:w-full 
          xl:w-[720px] xl:h-[531px] xl:max-w-3xl xl:text-center xl:space-y-6 xl:p-8 xl:flex xl:flex-col xl:items-center
          xl:rounded-[12px] xl:border-[3px] xl:border-[rgba(151,71,255,0.40)]
          xl:bg-gradient-to-b xl:from-[#FFF9F5] xl:to-[#ECFDF5]
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
            style={{
              color: "#111",
              textAlign: "center",
              fontSize: "28px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "48px", // 171.429%
            }}
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              color: "#374151",
              textAlign: "center",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "30px", // 171.429%
            }}
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <FeatureList title={hero.benefitsTitle} items={hero.benefits} />
          </motion.div>

          <motion.p
            id="hero-reassurance"
            className="text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {hero.reassurance}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            {/* Single primary CTA în viewport */}
            <Button variant="primary" onClick={() => setOpen(true)}>
              {hero.cta}
            </Button>

          </motion.div>
        </motion.section>
        <motion.section
          className="
          xl:hidden
          flex flex-col items-center justify-center gap-3
          text-[#111]
          "
        >
          <motion.h1
            className="
            w-[280px]
            font-bold text-lg leading-[34px]
            "
          >
            {hero.headlineMob}
          </motion.h1>

          <motion.p
            className="
              w-[334px] h-[55px] shrink-o
              text-center text-base leading-[28px]
            "
          >
              {hero.subheadlineMob}
          </motion.p>

          <motion.button>
            <Button 
              variant="primary"
              className="!text-[xl] !font-semibold !leading-[24px] mt-5 gap-[10px]"
              onClick={() => setOpen(true)}
            >
              {hero.ctaMob}
            </Button>

          </motion.button>

          <motion.article
            className="
              flex flex-col items-center
            "
          >
            <p
              className="
                w-[320px] h-[34px] mb-[10px] mt-[10px]
                text-center text-[#9747FF] text-lg font-bold leading-[34px]              
              "
            >
                {hero.benefitsTitleMob}
            </p>
            <div 
            className="
              flex flex-col items-center justify-center mb-[15px]
              leading-[28px] text-base font-normal text-center
              ">
              {hero.benefitsMob.map((benefit, index) => (
                <p key={index} className="text-center">
                  {benefit}
                </p>
              ))}
            </div>

            <p
              className="
                w-[277px] h[55px] mb-[15px] shrink-0
                text-[#6CA9F6] text-center text-base font-semibold leading-[28px]
              "
            >
              {hero.reassuranceMob}
            </p>
          </motion.article>
          <motion.button>
            <div
              className="
                w-[300px] h-[56px] shrink-0 justify-center items-center flex flex-col mb-3
                rounded-[12px] bg-gradient-to-r from-[#9E8CF6] to-[#C9BDF9] shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]
              ">
              <h2
                className="
                  text-[#111] text-sm font-bold leading-[14px]
                "
              >{hero.comingMob[0].tantrumsTitle}</h2>
              <p
                className="
                  text-[#111] text-sm font-normal leading-[14px]
                "
              >{hero.comingMob[0].tantrumsDescr}</p>
            </div>
            <div
              className="
                w-[300px] h-[56px] shrink-0 justify-center items-center flex flex-col mb-5
                rounded-[12px] bg-gradient-to-r from-[#9E8CF6] to-[#C9BDF9] shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]
              ">
              <h2>{hero.comingMob[1].sleepTitle}</h2>
              <p
                className="
                  text-[#111] text-sm font-normal leading-[14px]
                "
                >
                  {hero.comingMob[1].sleepDescr}</p>
            </div>
          </motion.button>
        </motion.section>
        <LPQuizOverlay open={open} onClose={() => setOpen(false)} />
      </main>

      <footer role="contentinfo" className="px-4 text-center mb-5">
        <Footer />
      </footer>
    </div>
  );
}