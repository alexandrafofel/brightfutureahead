// app/quiz/tips/TipsClient.tsx
"use client";

import dynamic from "next/dynamic";

// Importăm pagina de tips în mod dinamic pentru a dezactiva SSR în overlay.
const TipsPage = dynamic(() => import("./page"), { ssr: false });

export default function TipsClient(): JSX.Element {
  return <TipsPage />;
}
