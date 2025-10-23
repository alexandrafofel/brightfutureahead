// components/Quiz/FooterLP.tsx
import Link from "next/link";

import { PRIVACY_URL, TERMS_URL } from "@/lib/policy";

export function FooterLP() {
  return (
    <footer className="w-full text-center py-4">
      <p
        className="font-[Nunito_Sans] text-[12px] font-semibold leading-[18px] text-[rgba(136,136,136,0.6)]"
      >
        You can unsubscribe anytime. See{" "}
        <Link
          href={PRIVACY_URL || "/privacy"}
          className="text-[#4C90E6] hover:underline"
        >
          Privacy
        </Link>{" "}
        &{" "}
        <Link
          href={TERMS_URL || "/terms"}
          className="text-[#4C90E6] hover:underline"
        >
          Terms.
        </Link>
      </p>
    </footer>
  );
}
