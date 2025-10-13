// button-loader.tsx
import * as React from "react";

export function ButtonLoader({
  size = 20,
  label = "Loading…",
}: { size?: number; label?: string }) {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={label}
      className="inline-flex items-center justify-center"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className="animate-spin"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          opacity="0.25"
        />
        <path
          d="M22 12a10 10 0 0 1-10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
      </svg>
    </span>
  );
}
