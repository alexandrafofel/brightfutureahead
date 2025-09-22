import Image from "next/image";
import styles from "./WorkInProgressImage.module.css";
import LogoStackedTwoLayers from "@/components/ui/Logo/LogoStackedTwoLayers";

export default function WorkInProgressImage() {
  return (
    <section className={styles.WorkImage}>
      <div
        className={styles.Composite}
        role="img"
        aria-label="A crane hoisting the Lumlyn logo while workers guide it"
      >
        <Image
          className={styles.Base}
          src="/work-in-progress-sign.svg"
          alt=""
          width={654}
          height={446}
          priority
          aria-hidden="true"
        />
        <div className={styles.LogoWrap} aria-hidden="true">
          <LogoStackedTwoLayers/>
        </div>
      </div>
    </section>
  );
}
