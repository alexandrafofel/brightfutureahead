"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import ToastError from "./ToastError";

type ToastContextType = {
  showError: (message?: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showError = useCallback((message?: string) => {
    setErrorMessage(message || "Oops – something went wrong. Please try again.");
    setTimeout(() => setErrorMessage(null), 3000); // dispare automat dupa 3s
  }, []);

  return (
    <ToastContext.Provider value={{ showError }}>
      {children}
      {errorMessage && <ToastError message={errorMessage} />}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
