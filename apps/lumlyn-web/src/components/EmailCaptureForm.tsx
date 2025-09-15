"use client";

import { useForm, FormProvider } from "react-hook-form";
import { GdprConsentCheckbox } from "@/components/GdprConsentCheckbox";
import { POLICY_VERSION } from "@/lib/policy";

type FormValues = {
  email: string;
  gdprConsent: boolean;
};

export function EmailCaptureForm() {
  const methods = useForm<FormValues>({
    defaultValues: { email: "", gdprConsent: false },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValues) => {
    const payload = {
      email: data.email,
      consent_marketing: data.gdprConsent,
      policy_version: POLICY_VERSION,
    };

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("❌ lead submit failed");
    } else {
      console.log("✅ lead submitted", payload);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter your email to get your calm tip"
          />
          {errors.email && (
            <p className="text-sm text-red-600">
              Please enter a valid email address.
            </p>
          )}
        </div>

        <GdprConsentCheckbox />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Get Early Access"}
        </button>
      </form>
    </FormProvider>
  );
}
