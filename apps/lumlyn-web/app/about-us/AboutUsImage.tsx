// app/about-us/AboutUsImage.tsx
import Image from "next/image";

export function AboutUsImage() {
  return (
    <Image
      src="/images/purple_heart.svg"
      alt=""
      width={30}
      height={30}
      sizes="30px"
    />
  );
}
