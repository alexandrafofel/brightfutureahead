import * as React from "react";
import clsx from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { ButtonLoader } from "./button-loader";

type ButtonProps = {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "deactivated" | "loading";
  fullWidth?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  asChild = false,
  variant = "secondary",
  fullWidth = false,
  type = "button",
  disabled = false,
  className,
}: ButtonProps): JSX.Element {
  const Comp = asChild ? Slot : "button";

  const base = clsx(
      "w-[300px] " +
      "h-[56px] " + 
      "flex-shrink-0 " +
      "rounded-[12px] " + 
      "px-0 py-[32px] " +
      "flex justify-center items-center gap-[10px] " + 
      "text-center " + 
      "transition-colors duration-200"
    );

  const variants = {
    primary: clsx(
      base,
      "border-1 border-[#4C90E6] " +
      "bg-[linear-gradient(90deg,#6FAAF7_0%,#5597F2_100%)] " + 
      "shadow-[0_2px_6px_rgba(0, 0, 0, 0.15)] " +
      "text-white " +
      "text-[20px] " + 
      "not-italic " + 
      "font-semibold " +
      "leading-[24px] " +
      "hover:bg-[linear-gradient(90deg,#7FB9FF_0%,#4C90E6_100%)] " +
      "hover:bg-[linear-gradient(90deg,#5597F2_0%,#407FD9_100%)] " +
      "active:bg-[linear-gradient(90deg,#3D82E0_0%,#2C6AC7_100%)] " 
    ),
    secondary: clsx(
      base,
      "border-2 border-[#6C63FF] " +
      "bg-[#FFF] " +
      "text-[20px] " +
      "text-[#1A1A1A] " +
      "not-italic " +
      "font-bold " +
      "leading-normal " +
      "active:bg-[#6C63FF] " +
      "active:text-[#FFF] " +
      "active:shadow-[0_2px_4px_rgba(0,0,0,0.05)] " +
      "hover:bg-[#E1DEFF] " +
      "hover:shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] " +
      "hover:text-[#1A1A1A]"
    ),
    deactivated: clsx(
      base,
      "border-2 border-[#6C63FF] " +
      "bg-[#D0D5DD] " +
      "text-[20px] " +
      "text-[#4C90E6] " +
      "not-italic " +
      "font-bold " +
      "leading-normal " 
    ),
    loading: clsx(
      base,
      "bg-[linear-gradient(90deg,#6FAAF7_0%,#5597F2_100%)] " + 
      "border-2 border-[#6C63FF] " +
      "text-[20px] " +
      "text-[#1A1A1A] " +
      "not-italic " +
      "font-bold " +
      "leading-normal " +
      ButtonLoader
    )
  } as const;

  const classes = clsx(base, variants[variant], fullWidth && "w-full", className);

  if (asChild) {
    return <Comp className={classes}>{children}</Comp>;
  }

  return (
    <Comp type={type} disabled={disabled} className={classes}>
      {children}
    </Comp>
  );
}
