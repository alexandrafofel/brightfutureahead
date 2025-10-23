import Image from "next/image";

import {LogoStack} from "@/components/Logo/LogoStack";

import styles from "./WorkInProgressImage.module.css";

export function WorkInProgressImage() {
  return (
    <section className={styles.WorkImage}>
      <div className={styles.Stage}>
        <div className={styles.LogoWrap}>
        <div className={styles.Logo}>
          <LogoStack aria-label="Lumlyn Logo" />
        </div>
      </div>


        <div className={styles.SignWrap}>
          <Image
            className={styles.SignImg}
            src="/images/work-in-progress-sign.svg"
            alt=""
            width={654}
            height={446}
            priority
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
