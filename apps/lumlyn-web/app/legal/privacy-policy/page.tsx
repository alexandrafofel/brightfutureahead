import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { Nunito_Sans } from "next/font/google";
import BackButton from "@/components/BackButton/BackButton";
import styles from "./policy.module.css";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-nunito-sans",
});

export default async function PrivacyOrTermsPage() {
  const mdFile = "privacy-policy-v1.0.md"; // schimbă la "terms-and-conditions-v1.0.md" pentru Terms
  const filePath = path.join(process.cwd(), "content/legal", mdFile);
  const { content } = matter(fs.readFileSync(filePath, "utf8"));
  const contentHtml = (await remark().use(html).use(gfm).process(content)).toString();

  const headerTitle = mdFile.startsWith("terms") ? "Terms & Conditions" : "Privacy Policy";

  return (
    <div className={nunito.variable}>
      <header className={styles.headerBar}>
        <div className={`${styles.centerLine} ${styles.headerInner}`}>
          <BackButton className={styles.backWrap} aria-label="Back to previous page" />
          <h1 className={styles.headerTitle}>{headerTitle}</h1>
        </div>
      </header>

      <main className={styles.contentInner}>
        <article
          className={styles.policyContent}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </main>
    </div>
  );
}
