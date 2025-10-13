import { Suspense } from "react";
import OutroClient from "./OutroClient"; // <-- direct import din client component

export default function Page() {
  return (
    <Suspense fallback={null}>
      <OutroClient />
    </Suspense>
  );
}
