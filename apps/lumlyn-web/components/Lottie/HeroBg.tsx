"use client";

import * as React from "react";

import heroMobile from "@/assets/lottie/hero-bg-mob.json";
import heroDesktop from "@/assets/lottie/hero-bg.json";
import LottieBG from "@/components/Lottie/LottieBackgroundResponsive";

// 👉 folosim direct JSON-urile tale din assets

type Props = {
  /** px breakpoint pentru mobile (default 768) */
  breakpoint?: number;
  /** opacitate/z-index custom, etc. */
  className?: string;
  /** dacă vrei să oprești animația la users cu reduced-motion = true (default true) */
  autoplay?: boolean;
  /** viteza (1 = normal) */
  speed?: number;
  /** decorativ pentru screen readers (default true) */
  decorative?: boolean;
};

export default function HeroBg({
  breakpoint = 768,
  className,
  autoplay = true,
  speed = 1,
  decorative = true,
}: Props) {
  return (
    <LottieBG
      desktopSrc={heroDesktop}
      mobileSrc={heroMobile}
      breakpoint={breakpoint}
      autoplay={autoplay}
      speed={speed}
      className={className}
      decorative={decorative}
    />
  );
}
