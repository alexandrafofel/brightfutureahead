import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { Button } from "@/components/Button/button";

export default async function PrivacyOrTermsPage() {
  const mdFile = "terms-and-conditions-v1.0.md"; 
  const filePath = path.join(process.cwd(), "content/legal", mdFile);
  const { content } = matter(fs.readFileSync(filePath, "utf8"));
  const contentHtml = (await remark().use(html).use(gfm).process(content)).toString();
  const headerTitle = mdFile.startsWith("terms") ? "Terms & Conditions" : "Privacy Policy";

  return (
    <div>
      <header className="
        xl:relative
        flex
        xl:fixed z-50
        w-[1440px]
        h-[185px]
        bg-white
        shadow-[0_1px_2px_rgba(0,0,0,0.14)]
        xl:pt-[60px] pr-[856px] pb-[16px] pl-[10px]
        flex-col
        justify-end
        items-start
        gap-[37px]
        "
      >
        <Button 
          variant="back" 
          className="
            whitespace-nowrap 
            xl:absolute 
            xl:left-[360px] 
            bottom-[85px]
            "
        />
           
        <h1 
          className="
            xl:absolute
            text-[24px]
            text-[#000]
            xl:left-[360px]
            bottom-[16px]
            font-semibold
            leading-[32px]
            "
        >
            Terms &amp; Conditions
          </h1>
      </header>
      <main
        className="
            absolute top-[185px]
            self-stretch
            text-[#344054]
            text-[16px] leading-[26px]
            font-normal not-italic
            flex
            w-[740px]
            px-[10px] pt-[10px] pb-[24px]

            flex-col
            justify-center
            items-center

            gap-[10px]
            left-[360px]
            ">
        <article
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </main>
    </div>
  );
}
