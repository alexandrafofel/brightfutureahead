import fs from "node:fs/promises";
import path from "node:path";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import Image from "next/image";
import { Nunito_Sans } from "next/font/google";
import BackButton from "@/components/ui/BackButton";

export const metadata = { title: "Terms & Conditions – Lumlyn" };

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400","500","600"],
  display: "swap",
});

async function loadTermsMarkdown() {
  const full = path.join(process.cwd(), "content", "legal", "terms-and-conditions-v1.0.md");
  return fs.readFile(full, "utf8");
}

export default async function Page() {
  const md = await loadTermsMarkdown();
  const processed = await remark().use(html).process(md);
  const __html = String(processed);

  return (
    <main className={`${nunito.className} bg-white min-h-screen`}>
      {/* Header */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between">
          {/* Back button ca în mock */}
          <BackButton />
          {/* Logo mai mare (≈2x) */}
          <Image
            src="/lumlyn-logo-512.png"
            alt="Lumlyn"
            width={56}
            height={56}
            className="opacity-90"
            priority
          />
        </div>
      </div>

      {/* Conținut */}
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="prose max-w-none text-black">
          <div dangerouslySetInnerHTML={{ __html }} />
        </div>
      </div>
    </main>
  );
}
