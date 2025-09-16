"use client";

import { useForm, FormProvider, useWatch } from "react-hook-form";
import { GdprConsentCheckbox } from "@/components/GdprConsentCheckbox";
import { POLICY_VERSION } from "@/lib/policy";
import { usePostHog } from "posthog-js/react";

type FormValues = {
  email: string;
  gdprConsent: boolean;
};

export function EmailCaptureForm() {
  const methods = useForm<FormValues>({
    defaultValues: { email: "", gdprConsent: false },
    mode: "onChange",
  });

  const posthog = usePostHog();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  // 👇 urmărim starea checkbox-ului pentru a controla butonul
  const consentChecked = useWatch({ control: methods.control, name: "gdprConsent" });

  const onSubmit = async (data: FormValues) => {
    const payload = {
      email: data.email,                           // ⚠️ email NU se trimite către PostHog
      consent_marketing: true,                     // cerință AC
      policy_version: POLICY_VERSION,              // cerință AC
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Lead submit failed: ${res.status}`);

      // 🔵 PostHog — fără PII
      posthog?.capture("gdpr_consent_given", {
        source: "email_capture",
        policy_version: POLICY_VERSION,
        consent_marketing: true,
      });
      posthog?.capture("lead_submitted", {
        source: "email_capture",
      });

      // TODO: arată mesajul de success / redirect
      console.log("✅ lead submitted", { policy_version: POLICY_VERSION });
    } catch (err) {
      console.error(err);
      // opțional: posthog?.capture("lead_submit_error", { source: "email_capture" });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            {...register("email", {
              required: true,
              // validare simplă de format
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email to get your calm tip"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-sm text-red-600" role="alert">
              Hmm… that doesn’t look like a valid email. Try again?
            </p>
          )}
        </div>

        <GdprConsentCheckbox />

        {/* Hint vizibil când consimțământul nu e bifat */}
        {!consentChecked && (
          <p className="text-sm text-gray-600">
            Please tick the box to agree to the Terms & Privacy before continuing.
          </p>
        )}

        <button
          type="submit"
          // 🔒 disabled până avem bifă + gestionăm și loading
          disabled={!consentChecked || isSubmitting}
          className="w-full rounded bg-indigo-600 px-4 py-2 text-white transition-opacity disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isSubmitting ? "Submitting..." : "Get Early Access"}
        </button>
      </form>
    </FormProvider>
  );
}
