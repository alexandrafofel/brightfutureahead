"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import * as React from "react";

// Importăm lottie-react doar pe client (evită erori SSR)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type LottieBackgroundProps = {
  /** JSON-ul Lottie (ex: import outro from "@/lotties/outro.json") */
  src: object;
  /** Redă în buclă (default: true) */
  loop?: boolean;
  /** Pornește automat (respectă reduced-motion) */
  autoplay?: boolean;
  /** Viteză redare (1 = normal) */
  speed?: number;
  /** Clase extra pentru wrapperul absolut-inset (z-index etc.) */
  className?: string;
  /** Stiluri inline extra (opțional) */
  style?: React.CSSProperties;
  /** Ascunde pentru cititoare screen (e doar decorativ) */
  decorative?: boolean;
};

export default function LottieBackground({
  src,
  loop = true,
  autoplay = true,
  speed = 1,
  className,
  style,
  decorative = true,
}: LottieBackgroundProps) {
  const lottieRef = React.useRef<any>(null);

  // Respectă preferința "reduce motion"
  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  React.useEffect(() => {
    if (lottieRef.current && typeof lottieRef.current.setSpeed === "function") {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  return (
    <div
      className={clsx(
        "pointer-events-none absolute inset-0 -z-10", // sub conținut, nu blochează click-uri
        className
      )}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      style={style}
    >
      {/* fallback simplu dacă lottie-react nu e încă încărcat */}
      <div className="h-full w-full" />

      {/* Lottie pe tot containerul părinte (care trebuie să fie relative) */}
      <Lottie
        lottieRef={lottieRef as any}
        animationData={src}
        loop={loop}
        autoplay={autoplay && !prefersReducedMotion}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
