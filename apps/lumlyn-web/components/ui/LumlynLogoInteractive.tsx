"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Autodetectează grupurile din SVG (fără să ceri ID-uri):
 *  - icon (cloud) = <g> cu centrul cel mai din stânga
 *  - wordmark     = <g> cu lățimea cea mai mare (excluzând icon)
 * Creează clipPath din wordmark și aplică un "spot" doar pe litere.
 * Cloud-ul devine treptat mai transparent cât stai în hover.
 */
export default function LumlynLogoInteractive({
  width = 320,
  alt = "Lumlyn",
  src = "/lumlyn-logo-master.svg",
}: {
  width?: number;
  alt?: string;
  src?: string;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    (async () => {
      if (!hostRef.current) return;

      // 1) Load SVG markup
      const res = await fetch(src, { cache: "force-cache" });
      if (!res.ok) return;
      const svgText = await res.text();

      // 2) Inject inline
      hostRef.current.innerHTML = svgText;

      const svg = hostRef.current.querySelector("svg") as SVGSVGElement | null;
      if (!svg) return;

      const NS = "http://www.w3.org/2000/svg";

      // 3) Găsește grupurile
      const groups = Array.from(svg.querySelectorAll("g")) as SVGGElement[];
      if (!groups.length) return;

      // bbox helper
      const bbox = (el: SVGGraphicsElement) => {
        try {
          const b = el.getBBox();
          return { x: b.x, y: b.y, w: b.width, h: b.height, cx: b.x + b.width / 2 };
        } catch {
          return { x: 0, y: 0, w: 0, h: 0, cx: 0 };
        }
      };

      // icon = cel mai din stânga (min center x)
      let icon = groups[0];
      let iconBB = bbox(icon);
      for (const g of groups) {
        const b = bbox(g);
        if (b.cx < iconBB.cx) {
          icon = g; iconBB = b;
        }
      }

      // wordmark = cea mai mare lățime, excluzând icon
      let wordmark = groups.find(g => g !== icon) || groups[0];
      let wmBB = bbox(wordmark as any);
      for (const g of groups) {
        if (g === icon) continue;
        const b = bbox(g);
        if (b.w > wmBB.w) {
          wordmark = g; wmBB = b;
        }
      }

      if (!wordmark || !icon) return;

      // 4) defs + clipPath din wordmark (clone)
      let defs = svg.querySelector("defs") as SVGDefsElement | null;
      if (!defs) {
        defs = document.createElementNS(NS, "defs") as SVGDefsElement;
        svg.insertBefore(defs, svg.firstChild);
      }
      const clip = document.createElementNS(NS, "clipPath");
      clip.setAttribute("id", "lum-text-clip");
      clip.setAttribute("clipPathUnits", "userSpaceOnUse");
      const clone = (wordmark as SVGGElement).cloneNode(true) as SVGGElement;
      clone.removeAttribute("id");
      clip.appendChild(clone);
      defs.appendChild(clip);

      // 5) spot clipat DOAR în litere
      const spot = document.createElementNS(NS, "circle");
      spot.setAttribute("cx", "0");
      spot.setAttribute("cy", "0");
      spot.setAttribute("r", "0");
      spot.setAttribute("fill", "#000");
      spot.setAttribute("opacity", "0");
      spot.setAttribute("clip-path", "url(#lum-text-clip)");
      (spot.style as any).pointerEvents = "none";
      spot.style.transition = "opacity 350ms ease, r 350ms ease";
      svg.appendChild(spot);

      // 6) fade pentru cloud
      (icon as SVGElement).style.transition = "opacity 800ms ease";

      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

      let t1: number | undefined;
      let t2: number | undefined;

      const handleEnter = () => {
        if (reduceMotion) return;
        spot.setAttribute("opacity", "0.22");
        spot.setAttribute("r", String(Math.max(60, wmBB.h * 0.45)));
        (icon as SVGElement).style.opacity = "0.7";
        t1 = window.setTimeout(() => ((icon as SVGElement).style.opacity = "0.55"), 900);
        t2 = window.setTimeout(() => ((icon as SVGElement).style.opacity = "0.4"), 1800);
      };

      const handleMove = (e: MouseEvent) => {
        const rect = hostRef.current!.getBoundingClientRect();
        const vb = svg.viewBox.baseVal;
        const x = ((e.clientX - rect.left) / rect.width) * vb.width + vb.x;
        const y = ((e.clientY - rect.top) / rect.height) * vb.height + vb.y;
        spot.setAttribute("cx", String(x));
        spot.setAttribute("cy", String(y));
      };

      const handleLeave = () => {
        if (t1) window.clearTimeout(t1);
        if (t2) window.clearTimeout(t2);
        spot.setAttribute("opacity", "0");
        spot.setAttribute("r", "0");
        (icon as SVGElement).style.opacity = "1";
      };

      hostRef.current.addEventListener("mouseenter", handleEnter);
      hostRef.current.addEventListener("mousemove", handleMove);
      hostRef.current.addEventListener("mouseleave", handleLeave);

      setLoaded(true);
      cleanup = () => {
        hostRef.current?.removeEventListener("mouseenter", handleEnter);
        hostRef.current?.removeEventListener("mousemove", handleMove);
        hostRef.current?.removeEventListener("mouseleave", handleLeave);
      };
    })();

    return () => cleanup?.();
  }, [src]);

  return (
    <div
      aria-label={alt}
      style={{ width, height: "auto", display: "inline-block", lineHeight: 0, cursor: "default" }}
    >
      <div ref={hostRef} style={{ width: "100%", height: "auto", display: "block" }} />
      {!loaded && (
        <img
          src="/lumlyn-logo-512.png"
          alt={alt}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      )}
    </div>
  );
}
