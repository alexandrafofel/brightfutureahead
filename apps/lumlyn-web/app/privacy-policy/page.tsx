import fs from "node:fs/promises";
import path from "node:path";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import Image from "next/image";
import { Nunito_Sans } from "next/font/google";
import BackButton from "@/components/ui/BackButton";

export const metadata = { title: "Privacy Policy – Lumlyn" };

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400","500","600"],
  display: "swap",
});

async function loadPrivacyMarkdown() {
  const full = path.join(process.cwd(), "content", "legal", "privacy-policy-v1.0.md");
  return fs.readFile(full, "utf8");
}

export default async function Page() {
  const md = await loadPrivacyMarkdown();
  const processed = await remark().use(html).process(md);
  const __html = String(processed);

  return (
    <main className={`${nunito.className} bg-white min-h-screen`}>
      {/* Header */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between">
          <BackButton />
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
<h1
style={{
    fontFamily: "Nunito Sans, sans-serif",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "32px",
    color: "var(--Text-Primary, #1E293B)",
    margin: "16px 0 12px 0",
  }}
>
  Privacy Policy
</h1>

      {/* Conținut */}
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="prose max-w-none text-black">
          <div dangerouslySetInnerHTML={{ __html }} />
        </div>
      </div>
    </main>
  );
}
