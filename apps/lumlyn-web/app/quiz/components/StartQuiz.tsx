"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import CheckLegal, {
  type LegalValues,
  defaultLegalValues,
} from "@/components/Quiz/CheckLegal";
import { Button } from "@/components/Button/button";

const LS_KEY_GDPR = "lumlyn_gdpr_processing";
const LS_KEY_ACCEPT = "lumlyn_accept_legal";

type Props = {
  minutes?: number;
  disabled?: boolean;
  className?: string;
};

export default function StartQuiz({
  minutes = 1,
  disabled,
  className,
}: Props) {
  const router = useRouter();

  // Citește bifele din localStorage (dacă există) pentru a le menține la întoarcere din quiz.
  const defaultsFromStorage: LegalValues = React.useMemo(() => {
    if (typeof window === "undefined") return defaultLegalValues;
    return {
      gdpr_processing: localStorage.getItem(LS_KEY_GDPR) === "1",
      accept_legal: localStorage.getItem(LS_KEY_ACCEPT) === "1",
    };
  }, []);

  const methods = useForm<LegalValues>({
    defaultValues: {
      ...defaultLegalValues,
      ...defaultsFromStorage,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const bothChecked =
    !!watch("gdpr_processing") && !!watch("accept_legal");

  const onValid = () => {
    // Salvează bifele pentru ca, la Back din Q1, să rămână setate.
    try {
      if (bothChecked) {
        localStorage.setItem(LS_KEY_GDPR, "1");
        localStorage.setItem(LS_KEY_ACCEPT, "1");
      }
    } catch {
      // ignore storage errors (Safari private mode etc.)
    }
    // Intră în fluxul de întrebări
    router.push("/quiz/run");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onValid)} noValidate className={className}>
        <Button
          type="submit"
          variant={bothChecked ? "primary" : "deactivated"}
          disabled={disabled || isSubmitting || !bothChecked}
          className="!mb-5 !text-base !font-semibold !w-[320px] !border"
          data-role="start_quiz"
        >
          Start Quiz ({minutes} minute{minutes !== 1 ? "s" : ""})
        </Button>

        <CheckLegal className="space-y-2" />

        <p aria-label="isChecked"
          className={`absolute bottom-[50px] left-0 right-0 w-full text-center text-xs leading-5 text-[#F6A6A6] transition-all duration-300 ease-in-out ${
            bothChecked ? "invisible opacity-0" : "visible opacity-100"
          }`}
          aria-hidden={bothChecked}
        >
          Please check <strong>both boxes</strong> to continue.
        </p>


      </form>
    </FormProvider>
  );
}
