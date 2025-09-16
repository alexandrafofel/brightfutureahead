import Image from "next/image";

type LogoProps = {
  variant?: "center" | "top-left";
};

export function Logo({ variant = "center" }: LogoProps) {
  return (
    <div
      className={
        variant === "center"
          ? "fixed bottom-6 left-1/2 -translate-x-1/2"
          : "fixed top-4 left-4"
      }
    >
      <Image
        src="/lumlyn-logo-512.png"
        alt="Lumlyn logo"
        width={variant === "center" ? 120 : 40}
        height={variant === "center" ? 120 : 40}
        priority
      />
    </div>
  );
}
