// app/(marketing)/components/Hero/Hero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/Button/button";
import { LogoStack } from "@/components/Logo/LogoStack";
import { Footer } from "@/components/Footer/Footer";
import { FeatureList } from "./FeatureList";
import { hero } from "./messages/en";

export default function Hero(): JSX.Element {
  return (
    <div
      style={{ 
        background: "var(--Background-lavanda, rgba(249, 246, 255, 0.90))" 
      }}
      className="
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
          w-full px-4 py-3
          flex justify-center xl:justify-start
          xl:absolute xl:left-[68px] xl:top-[42px]
          xl:w-[192.188px] xl:h-[247px]
        "
        aria-label="Lumlyn home"
      > 
      <LogoStack/>

        <nav
          aria-label="Primary"
          className="hidden xl:flex items-center gap-2 justify-end"  // era xl:hidden
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
          px-4 py-8
          text-center 
        "
        >
        <motion.section
          aria-labelledby="hero-title"
          aria-describedby="hero-reassurance"
          className="w-full xl:w-[720px] xl:h-[531px] max-w-3xl text-center space-y-6 p-8 flex flex-col items-center"
          // Card-ul principal (gradient + border + shadow)
          style={{
            borderRadius: "12px",
            border: "3px solid rgba(151, 71, 255, 0.40)",
            background: "linear-gradient(180deg, #FFF9F5 0%, #ECFDF5 100%)",
            boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.15)",
          }}
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
            <Button asChild variant="primary">
              <Link href="/quiz">{hero.cta}</Link>
            </Button>
          </motion.div>
        </motion.section>
      </main>

      <footer role="contentinfo" className="px-4 py-6 text-center">
        <Footer />
      </footer>
    </div>
  );
}
