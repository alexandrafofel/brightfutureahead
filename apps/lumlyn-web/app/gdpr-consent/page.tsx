import fs from "fs/promises";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import { Logo } from "@/components/Logo";

export default async function PrivacyPolicyPage() {
  // ...markdown rendering cum ai deja
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Logo variant="top-left" />
      {/* articolul tău */}
    </main>
  );
}

export const metadata = {
  title: "Terms & Conditions • Lumlyn",
};

export default async function TermsPage() {
  // cale relativă către content/legal/GDPR-consent-checkbox–v1.0.md
  const filePath = path.join(
    process.cwd(),
    "content",
    "legal",
    "GDPR-consent-checkbox–v1.0.md"
  );

  const fileContents = await fs.readFile(filePath, "utf8");

  const processed = await remark().use(html).process(fileContents);
  const contentHtml = processed.toString();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <a
        href="/"
        className="mb-6 inline-block text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        ← Back
      </a>
      <article
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </main>
  );
}