import fs from "node:fs/promises";
import path from "node:path";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";

export const metadata = { title: "GDPR Consent – Lumlyn" };

async function loadGdprMarkdown() {
  const legalDir = path.join(process.cwd(), "content", "legal");
  const candidates = [
    "GDPR-consent-checkbox-v1.0.md",   // cratimă normală
    "GDPR-consent-checkbox–v1.0.md",   // en-dash (–)
    "gdpr-consent-checkbox-v1.0.md",
    "gdpr-consent-checkbox–v1.0.md",
  ];

  for (const fname of candidates) {
    try {
      const full = path.join(legalDir, fname);
      const txt = await fs.readFile(full, "utf8");
      return txt;
    } catch {}
  }
  throw new Error("GDPR consent markdown not found under content/legal");
}

export default async function Page() {
  const md = await loadGdprMarkdown();
  const processed = await remark().use(html).process(md);
  const __html = String(processed);
  return (
    <main className="prose mx-auto p-6">
      <p>
        <Link href="/">← Back home</Link>
      </p>
      <div dangerouslySetInnerHTML={{ __html }} />
    </main>
  );
}
