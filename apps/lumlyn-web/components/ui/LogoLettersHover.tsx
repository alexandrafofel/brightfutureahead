"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  size?: number;
  hoverColor?: string; // target color on hover
  src?: string;        // /public path to the SVG
};

export default function LogoLettersHover({
  size = 320,
  hoverColor = "#6754FF",
  src = "/lumlyn-logo-master.svg",
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [markup, setMarkup] = useState<string | null>(null);

  // Load SVG once
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(src, { cache: "force-cache" });
        const text = await res.text();
        if (alive) setMarkup(text);
      } catch {
        setMarkup(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, [src]);

  // After SVG is in the DOM, wire up hover to recolor the wordmark
  useEffect(() => {
    if (!markup || !hostRef.current) return;

    const root = hostRef.current;
    const svg = root.querySelector("svg") as SVGSVGElement | null;
    if (!svg) return;

    const groups = Array.from(svg.querySelectorAll("g")) as SVGGElement[];
    if (!groups.length) return;

    const bbox = (el: SVGGraphicsElement) => {
      try {
        const b = el.getBBox();
        return { x: b.x, w: b.width, cx: b.x + b.width / 2 };
      } catch {
        return { x: 0, w: 0, cx: 0 };
      }
    };

    // Heuristics: left-most group = icon; widest non-icon group = wordmark
    let icon = groups[0];
    let ib = bbox(icon);
    for (const g of groups) {
      const b = bbox(g);
      if (b.cx < ib.cx) { icon = g; ib = b; }
    }

    let wordmark = groups.find((g) => g !== icon) || groups[0];
    let wb = bbox(wordmark);
    for (const g of groups) {
      if (g === icon) continue;
      const b = bbox(g);
      if (b.w > wb.w) { wordmark = g; wb = b; }
    }

    const wmEl = wordmark as unknown as HTMLElement;
    const originalAttr = wmEl.getAttribute("fill");
    const originalStyle = wmEl.style.fill;
    wmEl.style.transition = "fill 220ms ease";

    const onEnter = () => {
      wmEl.setAttribute("fill", hoverColor);
      wmEl.style.fill = hoverColor;
    };
    const onLeave = () => {
      if (originalAttr) wmEl.setAttribute("fill", originalAttr);
      else wmEl.removeAttribute("fill");
      if (originalStyle) wmEl.style.fill = originalStyle;
      else wmEl.style.removeProperty("fill");
    };

    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mouseleave", onLeave);

    return () => {
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, [markup, hoverColor]);

  // IMPORTANT: no children when using dangerouslySetInnerHTML
  if (markup) {
    return (
      <div
        ref={hostRef}
        aria-label="Lumlyn"
        style={{ width: size, height: "auto", lineHeight: 0, display: "inline-block", cursor: "default" }}
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    );
  }

  // Fallback PNG
  return (
    <img
      src="/lumlyn-logo-512.png"
      alt="Lumlyn"
      style={{ width: size, height: "auto", display: "block" }}
    />
  );
}
