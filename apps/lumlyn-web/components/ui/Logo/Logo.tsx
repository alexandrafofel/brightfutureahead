import Image from "next/image";

type LogoProps = {
  variant?: "center" | "top-left" | "left-custom" | "top-custom";
  left?: string;
  top?: string;
};

export function Logo({ variant = "center", left, top }: LogoProps) {
  let className = "";
  let style: React.CSSProperties = {};

 if (variant === "center") {
  className = "fixed top-6 left-1/2 -translate-x-1/2";
}

  if (variant === "top-left") {
    className = "fixed top-4 left-4";
  }

  if (variant === "left-custom" && left && top) {
    style = {
      position: "fixed",
      left,
      top,
    };
  }

  if (variant === "top-custom" && top) {
    style = {
      position: "fixed",
      top,
      left: "50%",
      transform: "translateX(-50%)",
    };
  }

  return (
    <div className={className} style={style}>
      <Image
        src="/images/lumlyn-logo-512.png"
        alt="Lumlyn logo"
        width={variant === "center" ? 120 : 40}
        height={variant === "center" ? 120 : 40}
        priority
      />
    </div>
  );
}