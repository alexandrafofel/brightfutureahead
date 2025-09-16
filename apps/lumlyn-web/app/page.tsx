import dynamic from "next/dynamic";
const ConsentHero = dynamic(() => import("@/components/ConsentHero"), { ssr: true });
export default function Page() { return <ConsentHero />; }
