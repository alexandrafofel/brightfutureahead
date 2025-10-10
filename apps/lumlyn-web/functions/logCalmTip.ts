// apps/lumlyn-web/functions/logCalmTip.ts
// Tiny safe wrapper over PostHog that avoids runtime errors when window.posthog is missing.
// Use in client components only.

type PHProps = Record<string, any>;

function ph(): typeof window.posthog | undefined {
  if (typeof window === "undefined") return undefined;
  return window.posthog;
}

/** Fire-and-forget capture (client only). */
export function capture(event: string, props?: PHProps): void {
  try {
    ph()?.capture(event, props);
  } catch {
    // ignore
  }
}

/** Shorthand helpers used by quiz/tips flow. */
export const log = {
  quizClassified(props: PHProps) {
    capture("calm_tip_classified", props);
  },
  calmTipShown(props: PHProps) {
    capture("calm_tip_shown", props);
  },
  tipsEmailStart(props: PHProps) {
    capture("tips_email_submit_start", props);
  },
  tipsEmailSuccess(props: PHProps) {
    capture("tips_email_submit_success", props);
  },
  tipsEmailError(props: PHProps & { message?: string }) {
    capture("tips_email_submit_error", props);
  },
  tipsEmailResend(props: PHProps) {
    capture("tips_email_resend", props);
  },
  inviteCopy(props: PHProps) {
    capture("tips_invite_copy", props);
  },
  inviteMailto(props: PHProps) {
    capture("tips_invite_mailto", props);
  },
};

export default capture;
