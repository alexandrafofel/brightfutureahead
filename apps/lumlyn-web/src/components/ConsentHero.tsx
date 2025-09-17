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
      {/* ===== DESKTOP (1440px design) — poziționare exactă după checkbox ===== */}
      <div className="hidden xl:block relative mx-auto max-w-[1440px] min-h-[1021px]">
        {/* Logo mare, centrat sus */}
        <div className="pt-12 flex items-center justify-center">
          <Image
            src="/lumlyn-logo-512.png"
            alt="Lumlyn"
            width={140}
            height={140}
            priority
          />
        </div>

        {/* Grupul ancorat la checkbox: left = 536px, top = 465px (checkbox 44x44) */}
        <div
          className="absolute"
          style={{ left: 536, top: 465 }}
          aria-label="GDPR consent group"
        >
          <label className="flex items-center select-none cursor-pointer" style={{ columnGap: 16 }}>
            {/* Checkbox 44×44, radius 6, border 2px #3A4A66, bg alb */}
            <span className="relative inline-flex items-center justify-center h-11 w-11 shrink-0 mr-4">
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
                  "bg-white border-2 border-[#3A4A66] rounded-[6px]",
                  "transition-colors duration-150",
                  "peer-hover:border-[#FF6B00]",
                  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[#FF6B00]",
                  "peer-focus-visible:shadow-[0_0_8px_0_#FF6B00]",
                ].join(" ")}
              >
                {/* bifa — vizibilă doar când e checked */}
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

            <span className="ml-6 text-[16px]" style={{ lineHeight: "26px" }}>
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
                Privacy
              </Link>
            </span>
          </label>

          {/* Spațiu ≈ înălțimea butonului (44) + 10px → 54px */}
          <div className="mt-[54px]" />

          {/* BUTON — text alb mereu */}
          <button
            type="button"
            disabled={!checked}
            className={[
              "w-[220px] h-[44px] rounded-[8px] font-semibold text-[16px] transition-all duration-150",
              "text-white",
              "border-0 outline-none ring-0",
              !checked && "bg-[#D0D5DD] cursor-not-allowed",
              checked &&
                [
                  "bg-[#4C8BF5]",
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

      {/* ===== MOBILE/TABLET fallback — centrat și accesibil ===== */}
      <div className="block xl:hidden">
        <div className="pt-12 flex items-center justify-center">
          <Image
            src="/lumlyn-logo-512.png"
            alt="Lumlyn"
            width={480}
            height={480}
            priority
          />
        </div>

        <div className="px-6 mt-10 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <label className="flex items-center !gap-x-5 select-none cursor-pointer">
              <span className="relative inline-flex items-center justify-center h-11 w-11 shrink-0 mr-4">
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
                    "bg-white border-2 border-[#3A4A66] rounded-[6px]",
                    "transition-colors duration-150",
                    "peer-hover:border-[#FF6B00]",
                    "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[#FF6B00]",
                    "peer-focus-visible:shadow-[0_0_8px_0_#FF6B00]",
                  ].join(" ")}
                >
                  <svg
                    width="44"
                    height="44"
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

              <span className="ml-6 text-[16px]" style={{ lineHeight: "26px" }}>
                I agree to the {" "}
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
                  Privacy
                </Link>
              </span>
            </label>

            <div className="mt-[54px]" />

            <button
              type="button"
              disabled={!checked}
              className={[
                "w-[220px] h-[44px] rounded-[8px] font-semibold text-[16px] transition-all duration-150",
                "text-white",
                "border-0 outline-none ring-0",
                !checked && "bg-[#D0D5DD] cursor-not-allowed",
                checked &&
                  [
                    "bg-[#4C8BF5]",
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
      </div>
    </main>
  );
}
