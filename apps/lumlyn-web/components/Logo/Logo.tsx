import Link from "next/link";
import Image from "next/image";

export function Logo(): JSX.Element {
  return (
    <Link href="/" aria-label="Go to homepage" className="inline-block">
      <Image
        src="/images/lumlyn-logo-512.png"
        alt="Lumlyn logo"
        width={192}   // poți păstra 192.188, dar de obicei rotunjim
        height={120}
        priority
        className="shrink-0"
      />
    </Link>
  );
}
