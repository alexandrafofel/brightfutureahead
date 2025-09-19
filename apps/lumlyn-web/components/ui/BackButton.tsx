"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BackButton() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

    return (
    <button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.back()}
      style={{
        cursor: "pointer",
        display: "flex",
        height: "40px",
        padding: "6px 24px 6px 25px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        background: isHovered ? "#d5d5d5" : "var(--Button-Secundar, #E0E0E0)",
        border: isHovered ? "1px solid #666666" : "1px solid #999999",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.14)",
        transition: "none",
        fontWeight: 700,
        color: "#0A0A23",
        fontSize: "20px",
        lineHeight: "28px",
        fontFamily: "Nunito Sans, sans-serif",
      }}
    >
      ← Back
    </button>
  );
}
