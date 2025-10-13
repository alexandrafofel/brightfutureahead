// app/quiz/run/RunClient.tsx
"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

// Importăm QuizRunPage în mod dinamic pentru a dezactiva SSR. Folosim același
// fișier atât pentru ruta /quiz/run cât și pentru overlay.
const QuizRunPage = dynamic(() => import("./QuizRunPage"), { ssr: false });

export default function RunClient(
  props: ComponentProps<typeof QuizRunPage>,
): JSX.Element {
  return <QuizRunPage {...props} />;
}
