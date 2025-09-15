"use client";

import { useFormContext } from "react-hook-form";
import Link from "next/link";
import { TERMS_URL, PRIVACY_URL, POLICY_VERSION } from "@/lib/policy";

export function GdprConsentCheckbox() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          {...register("gdprConsent", { required: true })}
          className="mt-1 h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-indigo-500"
        />
        <span>
          I agree to the{" "}
          <Link
            href={TERMS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Terms
          </Link>{" "}
          &{" "}
          <Link
            href={PRIVACY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Privacy Policy
          </Link>{" "}
          (v{POLICY_VERSION})
        </span>
      </label>

      {errors.gdprConsent && (
        <p className="text-sm text-red-600">
          Please check this box to continue.
        </p>
      )}
    </div>
  );
}
