import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import { LogoStack } from "@/components/Logo/LogoStack";
import BackButton from "@/components/BackButton/BackButton";

export default async function TermsPage() {
  title: "Terms & Conditions • Lumlyn"
  const filePath = path.join(
    process.cwd(),
    "content",
    "legal",
    "GDPR-consent-checkbox-v1.0.md"
  );
  const md = await fs.readFile(filePath, "utf8");
  const processed = await remark().use(html).process(md);
  const contentHtml = processed.toString();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <LogoStack />
      <Link
         href="/"
        className="mb-6 inline-block text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
      </Link>
      <article
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
      <BackButton />
    </main>
  );
}
