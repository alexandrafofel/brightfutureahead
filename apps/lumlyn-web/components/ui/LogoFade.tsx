"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function LogoFade({
  size = 320,
  fadeTo = 0.4, // cât de transparent devine pe hover (0..1)
}: {
  size?: number;
  fadeTo?: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Image
      src="/lumlyn-logo-512.png"
      alt="Lumlyn"
      width={size}
      height={size}
      priority
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: size,
        height: "auto",
        display: "block",
        opacity: hovered ? fadeTo : 1,
        transition: "opacity 400ms ease",
        cursor: "default",
      }}
    />
  );
}
