"use client";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import * as React from "react";

import { ButtonLoader } from "./button-loader";


type Variant = "primary" | "secondary" | "deactivated" | "loading" | "back" | "contact";

export type ButtonProps = {
  asChild?: boolean;
  variant?: Variant;
  fullWidth?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  selected?: boolean; // 👈 nou: starea selectată (ex: opțiune de quiz)
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      asChild = false,
      variant = "secondary",
      fullWidth = false,
      loading = false,
      type = "button",
      disabled = false,
      iconLeft,
      iconRight,
      className,
      onClick,
      selected,
      ...rest
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const router = useRouter();

    const base =
      "inline-flex select-none items-center justify-center " +
      "rounded-[12px] h-[56px] w-[300px] text-center " +
      "transition-colors duration-200 focus-visible:outline-none " +
      "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4ED2E0]";

    const variants: Record<Variant, string> = {
      primary:
        "border border-[#4C90E6] text-white text-[20px] not-italic font-semibold leading-[24px] " +
        "bg-[linear-gradient(90deg,#6FAAF7_0%,#5597F2_100%)] shadow-[0_2px_6px_rgba(0,0,0,0.15)] " +
        "hover:bg-[linear-gradient(90deg,#7FB9FF_0%,#4C90E6_100%)] active:bg-[linear-gradient(90deg,#3D82E0_0%,#2C6AC7_100%)]",
      secondary:
        // normal + hover/active
        "border-2 border-[#6C63FF] bg-white text-[20px] text-[#1A1A1A] not-italic font-bold leading-normal " +
        "hover:bg-[#E1DEFF] hover:shadow-[0_2px_4px_rgba(0,0,0,0.05)] " +
        "active:bg-[#6C63FF] active:text-white active:shadow-[0_2px_4px_rgba(0,0,0,0.05)] " +
        // selected (mimetizează 'active' în mod permanent)
        "data-[selected=true]:bg-[#6C63FF] data-[selected=true]:text-white data-[selected=true]:border-[#6C63FF] " +
        "data-[selected=true]:shadow-[0_2px_4px_rgba(0,0,0,0.05)] " +
        "data-[selected=true]:hover:bg-[#574FE3]",
      deactivated:
        "border-2 border-[#6C63FF] bg-[#D0D5DD] text-[20px] text-[#4C90E6] not-italic font-bold leading-normal cursor-not-allowed",
      loading:
        "border-2 border-[#6C63FF] bg-[linear-gradient(90deg,#6FAAF7_0%,#5597F2_100%)] text-[20px] text-[#1A1A1A] not-italic font-bold leading-normal",
      back:
        "w-12 h-12 shrink-0 rounded-md border border-[#9747FF] " +
        "bg-white text-[#6C63FF] font-bold leading-none transition duration-[120ms] ease-in-out " +
        "hover:border-[3px] hover:border-[#4F46FF] hover:bg-[rgba(249,246,255,0.90)] hover:shadow-[0_4px_16px_rgba(79,70,255,0.25)] hover:p-[10px] " +
        "active:border-2 active:border-[#574FE3] active:bg-white active:text-[#574FE3] active:p-[10px] active:translate-y-[0.5px] active:shadow-none " +
        "focus-visible:border-2 focus-visible:border-[#4ED2E0] focus-visible:bg-white focus-visible:text-[#6C63FF] focus-visible:p-[10px] focus-visible:shadow-none " +
        "md:w-[48px] md:h-[48px] md:p-[12px] max-md:w-[44px] max-md:h-[44px] max-md:p-[10px]",
      contact:
        "border-2 border-[#6C63FF] bg-[#7C73FF] text-[16px] text-white not-italic font-bold leading-normal " +
        "hover:bg-[#E1DEFF] hover:shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:text-[#6C63FF] " +
        "active:bg-[#6C63FF] active:text-white active:shadow-[0_2px_4px_rgba(0,0,0,0.05)]",
    };

    const classes = clsx(base, variants[variant], fullWidth && "w-full", className);
    const isBack = variant === "back";
    const isDisabled = disabled || loading || variant === "deactivated";

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      if (isDisabled) return;
      if (isBack && onClick) return onClick(e);
      if (isBack) return router.back();
      onClick?.(e);
    };

    if (asChild) {
      return (
        <Slot
          ref={ref as any}
          className={classes}
          onClick={handleClick as any}
          aria-busy={loading || undefined}
          data-state={loading ? "loading" : "idle"}
          data-selected={selected ? "true" : undefined}
          {...rest}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        data-state={loading ? "loading" : "idle"}
        data-selected={selected ? "true" : undefined}  // 👈 cheie pentru stilul “selected”
        className={classes}
        onClick={handleClick}
        {...rest}
      >
        {variant === "back" && <span aria-hidden="true">←</span>}
        {variant !== "back" && iconLeft}
        <span className={clsx(loading && "opacity-0")}>{children}</span>
        {variant !== "back" && iconRight}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <ButtonLoader />
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
