import { Suspense } from "react";
import OutroClient from "./OutroClient"; 

export default function Outro() {
  return (
    <Suspense fallback={null}>
      <OutroClient />
    </Suspense>
  );
}
