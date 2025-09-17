"use client";

import Link from "next/link";
import { useState } from "react";
import { TERMS_URL, PRIVACY_URL } from "@/lib/policy";

export default function ConsentHero() {
  const [checked, setChecked] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        {/* Row cu checkbox + copy */}
        <label className="flex items-center gap-3 select-none">
          {/* Checkbox */}
          <span className="relative inline-flex items-center justify-center">
            <input
              type="checkbox"
              aria-label="I agree to the Terms and Privacy Policy"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="
                peer sr-only
              "
            />
            <span
              className={`
                inline-flex h-8 w-8 items-center justify-center rounded-[10px] 
                border transition-colors duration-150
                ${checked ? "border-[#2B4AA5]" : "border-[#0F1B2E]"}
                ${!checked ? "bg-white" : "bg-white"}
                shadow-[0_0_0_1px_rgba(15,27,46,0.08)]
              `}
            >
              {/* Bifa vizuală */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={`${checked ? "opacity-100" : "opacity-0"} transition-opacity duration-150`}
              >
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#5A8BFF" />
                    <stop offset="100%" stopColor="#3471EA" />
                  </linearGradient>
                </defs>
                <rect x="1.5" y="1.5" width="21" height="21" rx="6" ry="6" fill="url(#g1)" stroke="#244384" strokeWidth="1"/>
                <path d="M7 12.5l3 3 7-7" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>

          {/* Copy cu linkuri */}
          <span className="text-[16px] leading-6 text-[#0F1B2E]">
            I agree to the{" "}
            <Link href={TERMS_URL} className="text-[#2B5BD7] hover:underline focus:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href={PRIVACY_URL} className="text-[#2B5BD7] hover:underline focus:underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        {/* Buton */}
        <button
          type="button"
          disabled={!checked}
          className={`
            w-[220px] h-[44px] rounded-[10px]
            font-medium text-[16px]
            transition-all duration-150
            ${checked
              ? "text-white shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)]"
              : "text-[#243042]"}
            ${checked
              ? "bg-[linear-gradient(180deg,#5A8BFF_0%,#3471EA_100%)] hover:opacity-95 active:opacity-90"
              : "bg-[#DDE3EC] cursor-not-allowed"}
          `}
          onClick={() => {
            // aici poți deschide flow-ul next (ex: arată form-ul de email)
          }}
        >
          Submit
        </button>
      </div>
    </main>
  );
}
