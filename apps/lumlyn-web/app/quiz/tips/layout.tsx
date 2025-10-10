// apps/lumlyn-web/app/quiz/tips/layout.tsx
// Segment layout for /quiz/tips with SEO protection (noindex/nofollow).
// Server Component (no "use client").

import * as React from "react";

export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  // (opțional) dacă vrei și noarchive în meta standard:
  // other: { "googlebot": "noindex,nofollow,noarchive" },
};

export default function TipsLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <>{children}</>;
}
