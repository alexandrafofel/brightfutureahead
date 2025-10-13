import Image from "next/image";

export const BulletFavicon = () => (
  <Image
    src="/favicon.ico"
    alt="Loading..."
    width={20}
    height={16}
    priority
  />
);