"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TERMS_URL, PRIVACY_URL } from "../lib/policy";

type Props = {
  onConfirm?: () => void;
};

export default function ConsentHero({ onConfirm }: Props) {
  const [checked, setChecked] = useState(false);

  return (
    <main className="min-h-screen bg-[#F9F6FF]/90">
      {/* Logo mare și centrat sus */}
      <div className="max-w-[1440px] mx-auto pt-12 flex items-center justify-center">
        <Image
          src="/lumlyn-logo-512.png"
          alt="Lumlyn"
          width={140}
          height={140}
          priority
        />
      </div>

      {/* Conținut: checkbox + text + spațiu + buton */}
      <div className="max-w-[1440px] mx-auto px-6 mt-10 flex items-center justify-center">
        <div className="flex flex-col items-center">
          {/* Checkbox pătrat 44x44 + text */}
          <label className="flex items-center gap-3 select-none cursor-pointer">
            <span className="relative inline-flex items-center justify-center h-11 w-11">
              <input
                type="checkbox"
                aria-label="I agree to the Terms and Privacy Policy"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="peer absolute inset-0 h-full w-full opacity-0 cursor-pointer"
              />
              <span
                className={[
                  "inline-flex h-11 w-11 items-center justify-center",
                  "bg-white border-2 border-[#3A4A66] rounded-[4px] transition-colors duration-150",
                  "peer-hover:border-[#FF6B00]",
                  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[#FF6B00]",
                  "peer-focus-visible:shadow-[0_0_8px_0_#FF6B00]",
                ].join(" ")}
              >
                <svg
                  width="29"
                  height="23"
                  viewBox="0 0 29 23"
                  aria-hidden="true"
                  className={`${checked ? "opacity-100" : "opacity-0"} transition-opacity duration-150`}
                >
                  <path
                    d="M2 12.5L10.2 20.5L27 2.5"
                    fill="none"
                    stroke="#4C8BF5"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>

            <span className="text-[16px]" style={{ lineHeight: "26px" }}>
              I agree to the{" "}
              <Link
                href={TERMS_URL}
                className="text-[#4C8BF5] font-medium hover:underline focus:underline"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href={PRIVACY_URL}
                className="text-[#4C8BF5] font-medium hover:underline focus:underline"
              >
                Privacy Policy
              </Link>
            </span>
          </label>

          {/* Spațiu ≈ înălțimea butonului + 10px (44 + 8 = 52px) */}
          <div className="mt-[52px]" />

          {/* Buton fără border; focus outline + shadow #FF6B00; Nunito Sans vine global din layout */}
          <button
            type="button"
            disabled={!checked}
            className={[
              "w-[220px] h-[44px] rounded-[8px] font-semibold text-[16px] transition-all duration-150",
              "border-0 outline-none ring-0",
              !checked && "text-[#344054] bg-[#D0D5DD] cursor-not-allowed",
              checked &&
                [
                  "text-white bg-[#4C8BF5]",
                  "hover:bg-[#003EB5]",
                  "focus-visible:bg-[#155EEF]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B00]",
                  "focus-visible:shadow-[0_0_8px_0_#FF6B00]",
                ].join(" "),
            ].join(" ")}
            style={{ lineHeight: "26px" }}
            onClick={() => {
              if (!checked) return;
              try {
                localStorage.setItem("lumlyn_gdpr", "true");
              } catch {}
              onConfirm?.();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </main>
  );
}
