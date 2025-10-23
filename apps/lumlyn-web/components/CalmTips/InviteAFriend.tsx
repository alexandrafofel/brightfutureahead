"use client";

import * as React from "react";

import { Button } from "@/components/Button/button";

export type InviteAFriendProps = {
  /** Controls visibility */
  open: boolean;
  /** Called when user closes the modal */
  onClose: () => void;
  /** Optional link to share (defaults to current URL) */
  shareUrl?: string;
  /** Optional email subject/body seeds */
  emailSubject?: string;
  emailBodyPrefix?: string;
};

export default function InviteAFriend({
  open,
  onClose,
  shareUrl,
  emailSubject = "A calm tip that helped me",
  emailBodyPrefix = "I found this short, validated tip helpful. Sharing it with you:",
}: InviteAFriendProps): JSX.Element | null {
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = React.useState(false);

  const url =
    shareUrl ||
    (typeof window !== "undefined" ? window.location.href : "https://lumlyn.com/quiz/tips");

  const mailto = React.useMemo(() => {
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(`${emailBodyPrefix}\n\n${url}`);
    return `mailto:?subject=${subject}&body=${body}`;
  }, [emailSubject, emailBodyPrefix, url]);

  React.useEffect(() => {
    if (!open) return;
    // focus trap entry point
    const id = window.setTimeout(() => dialogRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [open]);

  React.useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      (window as any)?.posthog?.capture?.("tips_invite_copy", { url_len: url.length });
    } catch {
      setCopied(false);
    }
  };

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!open) return null;

  return (
    <div
      className="
      fixed inset-0 ] z-[60]
      flex items-center justify-center bg-black/50 backdrop-blur-[2px]
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-title"
      onClick={onBackdrop}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="w-[300px] h-[200px] border-2 border-[#9747FF] rounded-2xl bg-white p-5 outline-none shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
      >
        <div className="flex items-start justify-between">
          <h2 id="invite-title" className="text-[#1A1A1A] ml-[30%] mt-[5%] text-base font-semibold leading-[24px]">
            Invite a friend
          </h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#9747FF] focus:ring-offset-2"
          >
            ×
          </button>
        </div>

        <p id="invite-question" className="text-[#1A1A1A] text-[14px] font-semibold leading-[24px]">
            Want a friend to get their calm tip too?
        </p>

        <div className="mt-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <Button
              variant="primary"
              onClick={onCopy}
              className="!w-[175px] !h-[35px] border !border-[#4C90E6] text-sm font-semibold"
              aria-live="polite"
            >
              {copied ? "Copied" : "Copy Link"}
            </Button>
          
            <Button
              type="button"
              variant="primary"
              className="!w-[175px] !h-[35px] !bg-[#9747FF] hover:!bg-[#7e3df0] text-white border border-[#4C90E6] text-sm font-semibold"
              onClick={() => {
                (window as any)?.posthog?.capture?.("tips_invite_mailto");
                window.location.href = mailto;
              }}
            >
              Share via Email
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
}
