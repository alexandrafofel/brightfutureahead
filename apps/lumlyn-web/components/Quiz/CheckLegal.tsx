// /components/Quiz/CheckLegal.tsx
"use client";

import Link from "next/link";
import * as React from "react";
import { useFormContext, FieldErrors } from "react-hook-form";
import { Checkbox } from "@/components/Checkbox/Checkbox";

export type LegalValues = {
  gdpr_processing: boolean;
  accept_legal: boolean;
};

export const defaultLegalValues: LegalValues = {
  gdpr_processing: false,
  accept_legal: false,
};

type Props = {
  disabled?: boolean;
  className?: string;
  termsHref?: string;
  privacyHref?: string;
};

export default function CheckLegal({
  disabled,
  className,
  termsHref = "/legal/terms",
  privacyHref = "/legal/privacy-policy",
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<LegalValues>();

  const errs = (errors as FieldErrors<LegalValues>) ?? {};

  return (
    <fieldset disabled={disabled} aria-disabled={disabled} className={className}>
      {/* 1) GDPR processing — la 6px de stânga, gap 4px între box și text */}
      <div className="flex items-start gap-[4px] w-[325px] ml-[6px]">
        <Checkbox
          id="gdpr_processing"
          register={register("gdpr_processing", { required: true }) as any}
        />
        <label
          htmlFor="gdpr_processing"
          className="text-xs text-[#444] leading-[18px] font-semibold text-left"
        >
          I agree my data is used to generate this report (GDPR)
        </label>
      </div>

      {errs.gdpr_processing && (
        <p role="alert" className="mt-1 ml-[6px] text-xs text-red-600">
          Please agree to data processing
        </p>
      )}

      {/* 2) Accept Terms & Privacy — la 6px de stânga, gap 4px între box și text */}
      <div className="!mb-5 flex items-start gap-[4px] w-[325px] ml-[6px]">
        <Checkbox
          id="accept_legal"
          register={register("accept_legal", { required: true }) as any}
        />
        <label
          htmlFor="accept_legal"
          className="text-xs text-[#444] leading-[18px] font-semibold text-left"
        >
          I agree to the{" "}
          <Link href={termsHref} className="text-[#4C90E6]">
            Terms
          </Link>{" "}
          and{" "}
          <Link href={privacyHref} className="text-[#4C90E6]">
            Privacy Policy
          </Link>
          .
        </label>
      </div>

      {errs.accept_legal && (
        <p role="alert" className="mt-1 ml-[6px] text-xs text-red-600">
          Please accept the Terms & Privacy Policy
        </p>
      )}
    </fieldset>
  );
}
