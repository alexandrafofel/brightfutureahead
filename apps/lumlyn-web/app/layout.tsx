import { Nunito_Sans } from "next/font/google";
import "@/styles/globals.css";
import { ToastProvider } from "@/components/ToastError/ToastContext"; // 👈 import nou

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-nunito-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      {/* fortam fundalul alb indiferent de tema */}
      <body className="min-h-dvh bg-white text-[#344054] relative">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
