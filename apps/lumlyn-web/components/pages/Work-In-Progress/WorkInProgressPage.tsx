// app/work-in-progress/WorkInProgressPage.tsx
import LogoStackedTwoLayers from "@/components/ui/Logo/LogoStackedTwoLayers";
import FooterTermsPrivacy from "@/components/ui/FooterTermsPrivacy/FooterTermsPrivacy";
import styles from "./WorkInProgress.module.css";
import WorkInProgressImage from "./WorkInProgressImage";


export default function WorkInProgressPage() {
  return (
    <div className={styles.FrameRoot}>
      <header className={styles.hoverGroup} aria-label="Brand">
        <WorkInProgressImage/>
      </header>
      <div className={styles.AllText}>
        <div className={styles.BOXintroMessage} role="main" aria-labelledby="wip-title">        
          <div className={styles.InProgress}>
            <h2 id="wip-title" className={styles.Heading}>
              This space is still in progress.
                <br /><br />
              Soon, it will bring you something warm and useful — designed with
              care, calm, and science.
            </h2>
          </div>
          <section className={styles.FrameDetails}>
            <p className={styles.Details}>
              Calm in the making — <strong>quiz, chatbot, and personalised guidance to support your child</strong>, and
              to help <strong>parents, educators, and therapists</strong> with science and care. We’re also creating{" "}
              <strong>storybooks for children</strong> — gentle, realistic tales about rare but important moments like
              adoption or life with a twin.
            </p>
          </section>

          {/* 5) Frame: Release date (badge unic) */}
          <section className={styles.BOXcomingSoonDescription} aria-label="Release date">
            <span className={styles.ReleaseBadge}>
              Coming <time dateTime="2025-10-31">Oct 31, 2025</time>
            </span>
          </section>
        </div>
      </div>

      {/* 6) Frame: Footer */}
      <footer className={styles.FrameFooter} aria-label="Legal & Policies">
        <FooterTermsPrivacy />
      </footer>
    </div>
  );
}
