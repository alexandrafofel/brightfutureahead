"use client";

import React from "react";
import Link from "next/link";
import { TERMS_URL, PRIVACY_URL } from "../lib/policy";
import LogoFade from "@/components/ui/LogoFade";

export default function HomePageDraft() {
  return (
    <main className="relative min-h-screen bg-[#F9F6FF]/90">
      {/* ===== DESKTOP (≥1280px) ===== */}
      <div className="hidden xl:block relative mx-auto max-w-[900px] min-h-[900px]">
        <div className="pt-12 flex flex-col items-center text-center" style={{ marginTop: 50 }}>
          <LogoFade size={320} />

          <h1
            style={{
              fontFamily: "Nunito Sans, system-ui, sans-serif",
              color: "#4C90E6",
              marginTop: 40,
              fontSize: 40,
              fontWeight: 700,
              lineHeight: "1.2",
            }}
          >
            Welcome to our calm world - Lumlyn!
          </h1>

          <p
            style={{
              color: "#80ACE7",
              marginTop: 24,
              fontSize: 20,
              fontWeight: 400,
            }}
          >
            Work in progress — launching on <strong>October 31</strong>. 💫
          </p>
        </div>
      </div>

      {/* ===== MOBILE/TABLET (<1280px) ===== */}
      <div className="block xl:hidden">
        <div className="pt-12 flex flex-col items-center text-center" style={{ marginTop: 40 }}>
          <LogoFade size={280} />

          <h1
            style={{
              fontFamily: "Nunito Sans, system-ui, sans-serif",
              color: "#4C90E6",
              marginTop: 20,
              fontSize: 28,
              fontWeight: 700,
              lineHeight: "1.25",
            }}
          >
            Welcome to our calm world Lumlyn!
          </h1>

          <p
            style={{
              color: "#80ACE7",
              marginTop: 20,
              fontSize: 18,
              fontWeight: 400,
            }}
          >
            Work in progress — launching on <strong>October 31</strong>. 💫
          </p>
        </div>
      </div>

      {/* ===== FOOTER (fixed 10px from bottom) ===== */}
      <footer
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 10,
          textAlign: "center",
          padding: "0 12px",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "rgba(136,136,136,0.75)",
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Nunito Sans, system-ui, sans-serif",
          }}
        >
          See{" "}
          <Link href={PRIVACY_URL} style={{ color: "#4C90E6", fontWeight: 600, textDecoration: "none" }}>
            Privacy
          </Link>{" "}
          &{" "}
          <Link href={TERMS_URL} style={{ color: "#4C90E6", fontWeight: 600, textDecoration: "none" }}>
            Terms
          </Link>
          .
        </p>
      </footer>
    </main>
  );
}
