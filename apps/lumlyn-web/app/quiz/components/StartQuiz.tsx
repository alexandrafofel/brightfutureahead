// /components/Quiz/StartQuiz.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import CheckLegal, { LegalValues, defaultLegalValues } from "@/components/Quiz/CheckLegal";
import { Button } from "@/components/Button/button";
import Link from "next/link";

type Props = {
  redirectTo?: string;   // ex: "/quiz"
  minutes?: number;
  disabled?: boolean;
  className?: string;
};

export default function StartQuiz({
  redirectTo = "/quiz",
  minutes = 3,
  disabled,
  className,
}: Props) {
  const router = useRouter();

  const methods = useForm<LegalValues>({
    defaultValues: defaultLegalValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const bothChecked = !!watch("gdpr_processing") && !!watch("accept_legal");

  const onValid = () => {
    // TODO: opțional — trimite un event PostHog aici
    router.push(redirectTo);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onValid)} noValidate className={className}>
        <Button
            type="submit"
            variant={bothChecked ? "primary" : "deactivated"}
            disabled={disabled || isSubmitting || !bothChecked}
            className="!mb-5 !text-base !font-semibold !w-[320px] !border"
        >
          
            <Link href="/quiz/Stay-Close" aria-label="Quiz is about to start">
                Start Quiz ({minutes} minutes)
            </Link>
        </Button>

        <CheckLegal className="space-y-2" />

        {!bothChecked && (
          <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
            Please check both boxes to continue.
          </p>
        )}


        

      </form>
    </FormProvider>
  );
}
