"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { submitContact } from "@/app/contact/actions";
import { SuccessToast } from "./SuccessToast";
import { ErrorToast } from "./ErrorToast";

type FormValues = {
  name?: string;
  email: string;
  message: string;
  consent: boolean;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: { name: "", email: "", message: "", consent: false },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      const fd = new FormData();
      fd.append("name", data.name ?? "");
      fd.append("email", data.email);
      fd.append("message", data.message);
      fd.append("consent", String(Boolean(data.consent)));

      const res = await submitContact(fd);
      console.log("[contact] submit result:", res);

      if (res?.ok) {
        SuccessToast();
        reset(); // curăță câmpurile în RHF
        // de siguranță, reset nativ și dacă nu folosești RHF peste tot:
        const formEl = document.getElementById("contact-form") as HTMLFormElement | null;
        formEl?.reset();
        return;
      }

      const errMsg =
        (res && "error" in res && res.error) ||
        "Something went wrong. Please try again.";
      ErrorToast();
    } catch (e) {
      console.error("[contact] submit fatal:", e);
      ErrorToast();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Name */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Name (optional)
        </label>
        <input
          id="name"
          type="text"
          placeholder="Jane Doe"
          className="h-11 rounded-xl px-3 outline-none border"
          {...register("name", {
            setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
          })}
        />
        {errors.name && <p className="text-xs text-red-600">{String(errors.name.message)}</p>}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
            type="email"
          placeholder="you@domain.com"
          className="h-11 rounded-xl px-3 outline-none border"
          {...register("email", {
            required: "Email is required",
            setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
            validate: (v) =>
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Please enter a valid email",
          })}
          aria-invalid={!!errors.email || undefined}
        />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="How can we help?"
          className="rounded-xl p-3 outline-none border"
          {...register("message", {
            required: "Message is required",
            setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
            minLength: { value: 4, message: "Message is too short" },
            maxLength: { value: 5000, message: "Message is too long" },
          })}
          aria-invalid={!!errors.message || undefined}
        />
        {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
      </div>

      {/* Consent */}
      <label className="flex items-start gap-2">
        <input
          type="checkbox"
          className="mt-1"
          {...register("consent", {
            validate: (v) => v === true || "Consent is required",
          })}
        />
        <span className="text-sm">
          I agree that my details will be used to respond to my inquiry. No spam, ever.
        </span>
      </label>
      {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}

      {/* Submit */}
      <div className="mt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 px-5 rounded-xl bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send with care"}
        </button>
      </div>
    </form>
  );
}
