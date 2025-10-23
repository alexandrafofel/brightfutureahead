"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lottie from "lottie-react";
import loadingAnimation from "@/../public/animations/loading-animation.json";

export default function GlobalLoader() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  // apare scurt la schimbarea de pagină
  useEffect(() => {
    setIsVisible(true);
    const timeout = setTimeout(() => setIsVisible(false), 600); // durata scurtă
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div
      aria-busy="true"
      role="status"
      className="absolute inset-0 z-[9999] flex items-center justify-center bg-white/40 backdrop-blur-sm pointer-events-none"
    >
      <div className="w-32 h-32">
        <Lottie
          animationData={loadingAnimation}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
