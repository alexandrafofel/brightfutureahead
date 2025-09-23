import Image from "next/image";
import styles from "./WorkInProgressImage.module.css";
import LogoStack from "@/components/ui/Logo/LogoStack";

export default function WorkInProgressImage() {
  return (
    <section className={styles.WorkImage}>
      <div style={{ position: "relative"}}>
        <Image
          className={styles.Base}
          src="images/work-in-progress-sign.svg"
          alt=""
          width={654}
          height={446}
          priority
          aria-hidden="true"
        />
         {/* poziționare absolută */}
      <div style={{ position: "relative", top: "11rem", left: "9rem" }}>
        <LogoStack style={{ width: "15rem"}} />
      </div>
      </div>
    </section>
  );
}