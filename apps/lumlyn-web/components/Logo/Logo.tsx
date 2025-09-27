import Image from "next/image";

export function Logo(): JSX.Element {

  return (
    <Image
      src="/images/lumlyn-logo-512.png"
      alt="Lumlyn logo"
      width={192.188}
      height={120}
      flex-shrink={0}
      priority
    />
  );
}