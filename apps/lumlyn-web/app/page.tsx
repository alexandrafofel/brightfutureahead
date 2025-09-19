import dynamic from "next/dynamic";
const HomePageDraft = dynamic(() => import("@/components/HomePageDraft"), { ssr: true });
export default function Page() { return <HomePageDraft />; }
