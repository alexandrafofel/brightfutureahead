"use client";

import Image from "next/image";

/**
 * SuccessToast displays a transient success message after the contact form
 * submits successfully.  It uses `aria-live` so screen readers announce
 * updates politely.  The parent component is responsible for showing and
 * hiding this toast based on form state.
 */
export function SuccessToast() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[260px] p-3 rounded-xl bg-[rgba(168,230,207,0.90)] shadow-md flex flex-col items-center text-center"
    >
      <Image src="/images/envelope.svg" alt="" width={24} height={24} className="mb-2" />
      <p className="text-[#111] text-sm font-semibold leading-6">
        Thank you! We’ve received your message and will reply with care within 48 hours.
      </p>
    </div>
  );
}
