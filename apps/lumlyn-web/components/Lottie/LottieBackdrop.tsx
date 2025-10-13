"use client";

import * as React from "react";
import clsx from "clsx";
import dynamic from "next/dynamic";

// lottie-react doar pe client
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type LottieSrc = object | string;

async function loadJson(src: LottieSrc) {
  if (typeof src === "object") return src;
  const res = await fetch(src);
  return res.json();
}

function useMediaQuery(q: string) {
  const [m, setM] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mm = window.matchMedia(q);
    const on = () => setM(mm.matches);
    on();
    mm.addEventListener?.("change", on);
    return () => mm.removeEventListener?.("change", on);
  }, [q]);
  return m;
}

type Props = {
  desktopSrc: LottieSrc;
  mobileSrc: LottieSrc;
  breakpoint?: number;
  speed?: number;
  loop?: boolean;
  autoplay?: boolean;

  /** clase extra pt. wrapperul ABSOLUTE; implicit are z-0 */
  className?: string;
  style?: React.CSSProperties;

  /** clase extra pt overlay; implicit vine cu bg-black/50 + blur(10px) + opacity-100 */
  overlayClassName?: string;
  /** ascunde overlay-ul (păstrează doar lottie) */
  hideOverlay?: boolean;

  /** dacă e doar decorativ (ascuns screen-readers) */
  decorative?: boolean;

  /** schimbă z-indexul wrapperului (default 0) — util dacă părintele are stacking context ciudat */
  zIndex?: number;
};

export default function LottieBackdrop({
  desktopSrc,
  mobileSrc,
  breakpoint = 768,
  speed = 1,
  loop = true,
  autoplay = true,

  className,
  style,
  overlayClassName,
  hideOverlay = false,
  decorative = true,
  zIndex = 0,
}: Props) {
  const isMobile = useMediaQuery(`(max-width: ${breakpoint - 0.02}px)`);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const lottieRef = React.useRef<any>(null);

  const [inView, setInView] = React.useState(false);
  const [data, setData] = React.useState<object | null>(null);

  // vizibilitate în viewport
  React.useEffect(() => {
    if (!containerRef.current) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { rootMargin: "200px 0px", threshold: 0.01 }
    );
    io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  // load JSON când e probabil necesar
  React.useEffect(() => {
    let alive = true;
    if (!inView) return;
    const src = isMobile ? mobileSrc : desktopSrc;

    const run = () => {
      loadJson(src)
        .then((j) => alive && setData(j))
        .catch(() => alive && setData(null));
    };

    // @ts-ignore
    const ric =
      window.requestIdleCallback?.(run, { timeout: 800 }) ??
      setTimeout(run, 0);

    return () => {
      alive = false;
      // @ts-ignore
      window.cancelIdleCallback ? window.cancelIdleCallback(ric) : clearTimeout(ric);
    };
  }, [inView, isMobile, desktopSrc, mobileSrc]);

  // play / pause după vizibilitate + tab visibility
  React.useEffect(() => {
    const node = lottieRef.current;
    if (!node || typeof node.play !== "function") return;

    const playAllowed =
      inView && !prefersReducedMotion && autoplay && document.visibilityState === "visible";

    try {
      if (typeof node.setSpeed === "function") node.setSpeed(speed);
      playAllowed ? node.play() : node.pause();
    } catch {}

    const onVisibility = () => {
      const v = document.visibilityState === "visible";
      try {
        v && inView && !prefersReducedMotion && autoplay ? node.play() : node.pause();
      } catch {}
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [inView, prefersReducedMotion, autoplay, speed]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "absolute inset-0 pointer-events-none",
        // wrapperul are zIndex configurabil (default 0)
        className
      )}
      style={{ ...(style || {}), zIndex }}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
    >
      {/* strat Lottie (z-0) */}
      {data && (
        <div className="absolute inset-0 z-0">
          <Lottie
            lottieRef={lottieRef as any}
            animationData={data}
            loop={loop}
            autoplay={false} // controlat din efect
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      {/* overlay peste Lottie (z-10) — cu fallback inline pt. blur */}
      {!hideOverlay && (
        <div
          className={clsx(
            "absolute inset-0 z-10 bg-black/80 opacity-100",
            // lăsăm și utilitarul, dacă e disponibil în Tailwind:
            "backdrop-blur-2xl",
            overlayClassName
          )}
          style={{
            // fallback CSS în caz că utilitarul e purged sau Tailwind < v3
            backdropFilter: "backdrop-blur-2xl",
            WebkitBackdropFilter: "backdrop-blur-2xl",
          }}
        />
      )}
    </div>
  );
}
