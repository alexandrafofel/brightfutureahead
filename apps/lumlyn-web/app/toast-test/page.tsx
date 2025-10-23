"use client";
import { useToast } from "@/components/ToastError/ToastContext";

export default function Page() {
  const { showError } = useToast();
  return (
    <main className="min-h-screen flex items-center justify-center">
      <button
        onClick={() => showError("Server error – please try again.")}
        className="rounded-lg bg-[#9747FF] px-4 py-2 text-white font-semibold"
      >
        Trigger Error Toast
      </button>
    </main>
  );
}
