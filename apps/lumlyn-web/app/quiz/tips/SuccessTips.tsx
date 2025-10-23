"use client";

import clsx from "clsx";
import * as React from "react";

import { Button } from "@/components/Button/button";
import InviteAFriend from "@/components/CalmTips/InviteAFriend";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import { FooterLP } from "@/components/Quiz/FooterLP";

export type SuccessTipProps = {
  email: string;
  onEmailChange?: (email: string) => void;
  onResend?: () => Promise<void> | void;
  className?: string;
  "data-testid"?: string;
};

export default function SuccessTip({
  email,
  onEmailChange,
  onResend,
  className,
  "data-testid": testId = "success-tip",
}: SuccessTipProps) {
  const [inviteOpen, setInviteOpen] = React.useState(false);

  return (
    <section
      className={clsx(
        "w-full rounded-[20px] mx-auto border border-[#9747FF]",
        "xl:w-[640px] xl:h-[460px] w-[390px] h-[844px]",
        "bg-[rgba(249,246,255,0.90);]",
        "text-[#1A1A1A] font-semibold text-base leading-[18px]",
        "",
        className
      )}
      data-testid={testId}
      aria-live="polite"
    >
      <nav aria-label="Primary nav mobile" className="absolute top-[15px] right-[30px]">
        <MobileMenu />
      </nav> 

      <div className="grid items-center justify-center xl:mt-[5%] mt-[50%]">
        <label
          htmlFor="email-success"
          className="text-[#344054] xl:mr-[92%] xl:mt-[10%] mr-[80%] text-sm font-semibold"
        >
          Email
        </label>

        <div className="mb-[3%]">
          <input
            id="email-success"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Enter your email to receive your full calm tip"
            value={email}
            onChange={(e) => onEmailChange?.(e.target.value)}
            className={clsx(
              "w-full xl:max-w-[520px] w-[339px] mx-auto rounded-[12px] border px-4 py-3 bg-white/80 outline-none",
              "focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e]",
              "border-[#22c55e]"
            )}
            aria-describedby="email-success-help"
          />
        </div>

        <div id="email-success-help" className="text-center ml-5 mr-5 text-xs font-normal text-[#16a34a]">
            You’re all set! Check your inbox for your calm tip & early-access invite.
        </div>
      </div>

          <div className="flex flex-col items-center justify-center gap-5 xl:mt-[7%] mt-[25%] ">
            <Button
              type="button"
              onClick={() => onResend?.()}
              className={clsx(
                "h-12 text-base font-semibold",
                "!bg-[#4C90E6] text-white",
                "rounded-[12px] shadow-[0_6px_20px_rgba(99,102,241,0.35)] hover:opacity-95 active:opacity-80"
              )}
              aria-label="Resend email with your calm tip"
            >
              Resend email
            </Button>

            <Button
              type="button"
              onClick={() => setInviteOpen(true)}
              className={clsx(
                "h-12 text-base font-semibold",
                "!bg-[#6C63FF] hover:!bg-[#7e3df0] text-white",
                "rounded-[12px] shadow-[0_6px_20px_rgba(99,102,241,0.35)] hover:opacity-95 active:opacity-80"
              )}
            >
              Invite a friend
            </Button>
        </div>
        <footer className="xl:mt-[5%] mt-[50%]">
            <FooterLP/>
        </footer>
      <InviteAFriend open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </section>
  );
}
