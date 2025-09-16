// apps/lumlyn-web/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumlyn",
  description: "Feel calm & confident – science-backed parenting guidance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="font-sans antialiased bg-[#ECE9F1] text-[#1F2A37]">
        {children}
      </body>
    </html>
  );
}
