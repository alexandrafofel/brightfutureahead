"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import Link from "next/link";
import { TERMS_URL, PRIVACY_URL } from "../lib/policy";

export default function GdprConsentCheckbox() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex items-start space-x-2">
      <input
        id="gdpr"
        type="checkbox"
        {...register("gdprConsent", { required: "You must agree before submitting." })}
        className="mt-1"
        aria-invalid={errors.gdprConsent ? "true" : "false"}
      />
      <label htmlFor="gdpr" className="text-sm text-gray-700">
        I agree with the{" "}
        <Link href={TERMS_URL} className="underline hover:text-blue-600">
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link href={PRIVACY_URL} className="underline hover:text-blue-600">
          Privacy Policy
        </Link>
        .
      </label>
    </div>
  );
}
