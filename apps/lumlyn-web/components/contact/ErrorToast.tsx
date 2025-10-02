"use client";

/**
 * ErrorToast displays a transient error message when the contact form
 * submission fails.  It is visually distinct from the success toast to
 * convey failure.  The parent component controls its visibility.
 */
export function ErrorToast() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[260px] p-3 rounded-xl bg-[#F6A6A6] shadow-md flex flex-col items-center text-center"
    >
      <p className="text-white text-sm font-semibold leading-6">
        Oops – something went wrong.<br />
        Please try again.
      </p>
    </div>
  );
}
