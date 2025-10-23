"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import * as React from "react";

export type ToastErrorProps = {
  message?: string;
  className?: string;
};

export default function ToastError({
  message = "Oops – something went wrong. Please try again.",
  className,
}: ToastErrorProps): JSX.Element {
  return (
    <motion.div
      role="alert"
      aria-live="assertive"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "absolute bottom-[37px] xl:ml-[45%] ml-[30%]",
        "w-[260px] h-[123px]",
        "bg-[#F6A6A6] text-white text-center rounded-[8px]",
        "flex items-center justify-center",
        "font-[600] text-[16px] leading-[24px] font-[Nunito_Sans]",
        "shadow-md",
        className
      )}
    >
      {message}
    </motion.div>
  );
}
