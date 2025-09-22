"use client";
import { useRouter } from "next/navigation";
import React from "react";
import "./BackButton.css";

type BackButtonProps = {
  className?: string;                 // opțional: pentru poziționare suplimentară
  style?: React.CSSProperties;        // opțional: override punctual (ex: top/left)
  ariaLabel?: string;                 // accesibilitate (implicit: "Back")
};

export default function BackButton({
  className = "",
  style,
  ariaLabel = "Back",
}: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={`button ${className}`}  // .button este definită în BackButton.css
      style={style}
      aria-label={ariaLabel}
      onClick={() => router.back()}
    >
      <span aria-hidden="true">←</span>
    </button>
  );
}
