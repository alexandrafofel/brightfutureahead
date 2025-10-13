import Image from "next/image";

export function LogoCloud(): JSX.Element {
  return (
      <Image
        src="/images/lumlyn-logo-cloud.svg"
        alt="Lumlyn logo cloud"
        width={10}   // poți păstra 192.188, dar de obicei rotunjim
        height={8}
        priority
        className="shrink-0"
      />
  );
}
