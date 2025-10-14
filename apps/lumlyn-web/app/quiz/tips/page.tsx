"use client";

import * as React from "react";
import CalmTipFrame from "@/components/CalmTips/CalmTipFrame";
import InviteAFriend from "@/components/CalmTips/InviteAFriend";
import getCalmTip from "@/functions/getCalmTip";

export default function TipsPage(): JSX.Element {
  // Load quiz answers
  const [answers, setAnswers] = React.useState<Record<string, any> | null>(null);
  React.useEffect(() => {
    try {
      const raw =
        localStorage.getItem("lumlyn_quiz_answers") ??
        sessionStorage.getItem("lumlyn_quiz_answers");
      setAnswers(raw ? JSON.parse(raw) : {});
    } catch {
      setAnswers({});
    }
  }, []);

  // Compute calm tip
  const tipResult = React.useMemo(() => getCalmTip(answers || undefined), [answers]);
  const tipText = tipResult?.tip?.text ?? "";

  // Meta for analytics + email (tolerant la denumiri)
  const anyTip = tipResult as any;
  const meta = {
    tip_id: tipResult?.tip?.tip_id ?? anyTip?.tipId ?? null,
    topic: tipResult?.tip?.topic ?? anyTip?.topic ?? null,
    age_band: tipResult?.tip?.age_band ?? anyTip?.ageBand ?? null,
    user_type: anyTip?.classified?.user_type ?? anyTip?.userType ?? null,
    strategy: anyTip?.strategy ?? null,
    mood: anyTip?.mood ?? anyTip?.meta?.mood ?? null,
    quiz_version:
      anyTip?.quiz_version ?? anyTip?.quizVersion ?? anyTip?.meta?.quiz_version ?? "v1",
  };

  // Track shown
  React.useEffect(() => {
    (window as any)?.posthog?.capture?.("calm_tip_shown", meta);
  }, [meta.tip_id]);

  // Invite modal
  const [inviteOpen, setInviteOpen] = React.useState(false);

  return (
    <main className="relative flex items-center justify-center px-4 py-8">
      <div className="relative z-20 flex flex-col items-center">
        <CalmTipFrame tipText={tipText} meta={meta} postUrl="/api/leads" />
      </div>

      <InviteAFriend open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </main>
  );
}
