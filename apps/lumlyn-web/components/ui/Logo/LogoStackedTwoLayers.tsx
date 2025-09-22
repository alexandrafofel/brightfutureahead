// components/ui/LogoStackedTwoLayers.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './LogoStackedTwoLayers.module.css';

type Props = {
  className?: string;
  variant?: "center" | "right" | "left-custom" | "top-custom";
  left?: string;
  top?: string;
};

export const LogoStackedTwoLayers = ({ variant = "center", className, left, top }: Props) => {
  const [hovered, setHovered] = useState(false);

  let wrapperClass = "";
  let wrapperStyle: React.CSSProperties = {};

  if (variant === "center") {
    wrapperClass = styles.logoWrapper;
    left: "600px";
  }

  if (variant === "right") {
    wrapperClass = styles.logoWrapper;
   wrapperStyle = {
    position: "absolute",
    right: "0px",  
   }
  }

  if (variant === "left-custom" && left && top) {
    wrapperClass = styles.logoWrapper;
    wrapperStyle = {
      position: "fixed",
      left,
      top,
    };
  }

  if (variant === "top-custom" && top) {
    wrapperStyle = {
      position: "fixed",
      top,
      left: "50%",
      transform: "translateX(-50%)",
    };
  }

  return (
    <div
      className={`${wrapperClass} ${className ?? ""}`}
      style={wrapperStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src="/lumlyn-logo-cloud.svg"
        alt="Lumlyn Logo Cloud"
        width={240}
        height={240}
        priority
        className={`${styles.cloud} ${hovered ? styles.show : styles.hide}`}
      />
      <Image
        src="/lumlyn-logo-letters.svg"
        alt="Lumlyn Logo Letters"
        width={100}
        height={200}
        priority
        className={`${styles.letters} ${hovered ? styles.show : styles.hide}`}
      />
      <Image
        src="/logo-text-pressed-dark-solmon.svg"
        alt="Lumlyn Logo Letters Solmon"
        width={100}
        height={200}
        priority
        className={`${styles.letterssolmon} ${hovered ? styles.show : styles.hide}`}
      />
    </div>
  );
};

export default LogoStackedTwoLayers;
