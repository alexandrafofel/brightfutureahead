"use client";

import * as React from "react";

export type RegisteredCheckbox = {
  name: string;
  onBlur: (e: React.FocusEvent<any>) => void;
  onChange: (e: React.ChangeEvent<any>) => void;
  ref: (instance: HTMLInputElement | null) => void;
};

interface CheckboxProps {
  id: string;
  register: RegisteredCheckbox;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export function Checkbox({
  id,
  register,
  className,
  disabled = false,
  ariaLabel,
}: CheckboxProps) {
  const { name, onBlur, onChange, ref } = register;

  return (
    <label
      htmlFor={id}
      className={[
        "relative inline-flex items-center select-none",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className ?? "",
      ].join(" ")}
    >
      <span
        aria-hidden
        className="relative inline-flex h-[20px] w-[20px] items-center justify-center rounded-[4px]"
      >
        {/* 1) INPUT înaintea elementelor controlate de peer */}
        <input
          id={id}
          name={name}
          type="checkbox"
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
          disabled={disabled}
          aria-label={ariaLabel}
          className="peer absolute inset-0 z-10 h-full w-full opacity-0
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4C90E6]/50
                     disabled:cursor-not-allowed"
        />

        {/* 2) NEBIFAT — contur albastru */}
        <svg
          className="block peer-checked:hidden"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="transparent" />
          <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" stroke="#4C90E6" />
        </svg>

        {/* 3) BIFAT — fundal #6FAAF7, stroke #4C90E6, bifa albă */}
        <svg
          className="hidden peer-checked:block"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="#6FAAF7" />
          <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" stroke="#4C90E6" />
          <path
            d="M4 8.41071L9.60345 17L17 4"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </label>
  );
}
