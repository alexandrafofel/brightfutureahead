import fs from "fs/promises";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import { Logo } from "@/components/Logo";

export const metadata = {
  title: "Privacy Policy • Lumlyn",
};

export default async function PrivacyPolicyPage() {
  const filePath = path.join(process.cwd(), "content", "legal", "privacy-policy-v1.0.md");
  const md = await fs.readFile(filePath, "utf8");
  const processed = await remark().use(html).process(md);
  const contentHtml = processed.toString();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Logo variant="top-left" />
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
