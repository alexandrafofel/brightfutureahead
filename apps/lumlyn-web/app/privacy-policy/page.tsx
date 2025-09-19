import fs from "node:fs/promises";
import path from "node:path";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { Nunito_Sans } from "next/font/google";
import BackButton from "components/ui/BackButton";

export const metadata = { title: "Privacy Policy – Lumlyn" };

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

async function loadPrivacyMarkdown() {
  const full = path.join(
    process.cwd(),
    "content",
    "legal",
    "privacy-policy-v1.0.md"
  );
  return fs.readFile(full, "utf8");
}

export default async function Page() {
  const md = await loadPrivacyMarkdown();
  const processed = await remark().use(gfm).use(html).process(md);
  const __html = String(processed);

  // padding orizontal: mic pe mobil, crește pe ecrane mari
  const padX = "clamp(16px, 5vw, 120px)";

  return (
    <main className={nunito.className} style={{ background: "#FFF", minHeight: "100vh" }}>
      {/* Bandă full-width */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          width: "100%",
          background: "#FFF",
          boxShadow: "0 1px 2px 0 rgba(0,0,0,0.14)",
        }}
      >
        {/* Container centrat, max 1440px */}
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: `60px ${padX} 16px ${padX}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "37px",
            color: "#1E293B",
          }}
        >
          <BackButton ariaLabel="Back" />
          <h1
            style={{
              margin: 0,
              color: "#1E293B",
              fontFamily: '"Nunito Sans", sans-serif',
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "32px",
            }}
          >
            Privacy Policy
          </h1>
        </div>
      </header>

      {/* Bandă full-width */}
      <section style={{ width: "100%", background: "#FFF" }}>
        {/* Container centrat, max 1440px */}
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: `24px ${padX} 80px ${padX}`,
            color: "#344054",
            fontFamily: '"Nunito Sans", sans-serif',
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "26px",
          }}
          dangerouslySetInnerHTML={{ __html }}
        />
      </section>
    </main>
  );
}
