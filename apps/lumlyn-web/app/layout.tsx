import { Nunito_Sans } from "next/font/google";
import "@/styles/globals.css";
import { ToastProvider } from "@/components/ToastError/ToastContext";
import GlobalLoader from "@/components/Loading/GlobalLoader";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-nunito-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      {/* fundal alb indiferent de tema */}
      <body className="min-h-dvh bg-white text-[#344054] relative">
        <ToastProvider>
          <GlobalLoader /> {/* 👈 animația globală peste tot */}
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
