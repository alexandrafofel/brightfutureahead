// "Terms & Conditions"

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { LegalHeader } from "@/app/legal/LegalHeader";

export async function PrivacyOrTermsPage() {
  const mdFile = "terms-and-conditions-v1.0.md"; // sau "terms-*.md"
  const filePath = path.join(process.cwd(), "content/legal", mdFile);
  const { content } = matter(fs.readFileSync(filePath, "utf8"));
  const contentHtml = (await remark().use(html).use(gfm).process(content)).toString();

  return (
    <div className="
    min-h-dvh bg-white
    
    ">    
      <LegalHeader 
        title="Terms & Conditions" 
      />
      {/* Conținut Markdown în container fluid + tipografie accesibilă */}
      <main 
      className="
        mx-auto max-w-screen-md 
        px-4 sm:px-6 lg:px-8 py-6 lg:py-10
        "
      >
        <article
          className="
            prose prose-slate lg:prose-lg max-w-none
            prose-p:my-1 prose-h1:mb-2 prose-h2:mt-2 prose-h2:mb-0
          "
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </main>
    </div>
  );
}
