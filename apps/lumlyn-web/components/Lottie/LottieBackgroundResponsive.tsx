"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";

// lottie-react doar pe client (evităm SSR errors)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type LottieSrc = object | string;

type Props = {
  /** JSON Lottie pentru desktop (obiect importat sau URL public) */
  desktopSrc: LottieSrc;
  /** JSON Lottie pentru mobile (obiect importat sau URL public) */
  mobileSrc: LottieSrc;
  /** px breakpoint pentru mobile (default: 768) */
  breakpoint?: number;
  /** Redare în buclă (default: true) */
  loop?: boolean;
  /** Autoplay (se oprește dacă user-ul are reduced motion) */
  autoplay?: boolean;
  /** Viteză animație (1 = normal) */
  speed?: number;
  /** Clase extra pe wrapperul absolut-inset (z-index, opacity etc.) */
  className?: string;
  style?: React.CSSProperties;
  /** Dacă e doar decor, ascundem de cititoare ecran */
  decorative?: boolean;
};

function useMediaQuery(query: string) {
  const [matches, set] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia(query);
    const onChange = () => set(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, [query]);
  return matches;
}

async function loadJson(src: LottieSrc): Promise<object | null> {
  if (typeof src === "object") return src;
  try {
    const res = await fetch(src);
    return await res.json();
  } catch {
    return null;
  }
}

export default function LottieBackgroundResponsive({
  desktopSrc,
  mobileSrc,
  breakpoint = 768,
  loop = true,
  autoplay = true,
  speed = 1,
  className,
  style,
  decorative = true,
}: Props) {
  const isMobile = useMediaQuery(`(max-width: ${breakpoint - 0.02}px)`);
  const [data, setData] = React.useState<object | null>(null);
  const lottieRef = React.useRef<any>(null);

  // Respectă preferința "reduce motion"
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Încarcă JSON-ul corespunzător view-ului curent
  React.useEffect(() => {
    let ok = true;
    loadJson(isMobile ? mobileSrc : desktopSrc).then((j) => {
      if (ok) setData(j);
    });
    return () => {
      ok = false;
    };
  }, [isMobile, desktopSrc, mobileSrc]);

  // Setează viteza când avem referință
  React.useEffect(() => {
    if (lottieRef.current && typeof lottieRef.current.setSpeed === "function") {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  return (
    <div
      className={clsx("pointer-events-none absolute inset-0 -z-10", className)}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      style={style}
    >
      {!data ? (
        <div className="h-full w-full" />
      ) : (
        <Lottie
          lottieRef={lottieRef as any}
          animationData={data}
          loop={loop}
          autoplay={autoplay && !prefersReducedMotion}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}
