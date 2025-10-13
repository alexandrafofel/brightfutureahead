"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import posthog from "posthog-js";
import { submitContact } from "@/app/contact/actions";
import { TextField } from "./TextField";
import { Textarea } from "./Textarea";
import { Checkbox } from "./Checkbox";
import { SuccessToast } from "./SuccessToast";
import { ErrorToast } from "./ErrorToast";
import { Button } from "@/components/Button/button";

/**
 * Shape of the contact form values.  `name` is optional, the rest are required.
 */
type FormValues = {
  name: string;
  email: string;
  message: string;
  consent: boolean;
};

/**
 * The client side contact form.  Handles validation, submission and toast
 * presentation.  Server communication is delegated to the `submitContact`
 * server action.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      consent: false,
    },
  });

  /**
   * Called when the form is submitted.  Performs a final check on the client
   * side and then calls the server action.  Based on the returned value a
   * success or error toast is shown.  PostHog events are emitted without
   * including personally identifiable information.
   */
  const onSubmit = async (values: FormValues) => {
    // Build a FormData to satisfy the server action signature.  The keys must
    // match the form field names.  Note: we convert the boolean consent to
    // a string to preserve the semantics from HTML forms (`on` when checked).
    const fd = new FormData();
    fd.append("name", values.name);
    fd.append("email", values.email);
    fd.append("message", values.message);
    fd.append("consent", values.consent ? "on" : "");
    try {
      const result = await submitContact(fd);
      if (result.ok) {
        setStatus("success");
        // Reset the form so the user can send another message without
        // manually clearing fields.  Name remains optional.
        reset({ name: "", email: "", message: "", consent: false });
        // Track the submission without storing PII.
        try {
          posthog.capture?.("contact_submitted", { status: "success" });
        } catch (_) {
          // Intentionally ignore analytics errors.
        }
      } else {
        setStatus("error");
        try {
          posthog.capture?.("contact_submitted", { status: "error" });
        } catch (_) {
          /* swallow analytics failures */
        }
      }
    } catch (err) {
      setStatus("error");
      try {
        posthog.capture?.("contact_submitted", { status: "error" });
      } catch (_) {
        /* swallow analytics failures */
      }
    }
  };

  // Automatically hide toast messages after ~1.6 seconds.  When status
  // transitions back to "idle" the next toast can appear.
  useEffect(() => {
    if (status !== "idle") {
      const timer = setTimeout(() => setStatus("idle"), 1600);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col sm:flex-row gap-4">
        <TextField
          label="Full name"
          placeholder="Your full name"
          register={register("name") as any}
          error={errors.name?.message}
        />
        <TextField
          label="Email address"
          placeholder="your@email.com"
          register={register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address.",
            },
          }) as any}
          error={errors.email?.message}
        />
      </div>
      <div className="mt-4">
        <Textarea
          label="Message"
          placeholder="How can we help you?"
          register={register("message", {
            required: "Message is required.",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters.",
            },
          }) as any}
          error={errors.message?.message}
        />
      </div>
      <div className="mt-4 flex items-start gap-2">
        <Checkbox id="consent" register={register("consent", { required: true }) as any} />
        <label htmlFor="consent" className="text-sm text-[#111] leading-5">
          I agree that my details will be used to respond to my inquiry. No spam, ever.
        </label>
      </div>
      {errors.consent && (
        <p id="consent-error" className="text-red-600 text-sm mt-1">
          Please agree to the consent.
        </p>
      )}
        <Button
        variant="contact"
        className="mt-6 h-12 flex ml-[5px] xl:ml-[130px]">Send with care</Button>
      {status === "success" && <SuccessToast />}
      {status === "error" && <ErrorToast />}
    </form>
  );
}
