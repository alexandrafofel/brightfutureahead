/**
 * Jest test for getCalmTip() selector + fallback logic.
 * This test uses a *small inline dataset* (no external JSON import required)
 * to avoid config issues with JSON modules in Jest.
 */

import { getCalmTip } from "@/functions/getCalmTip";
import type { CalmTipEntry } from "@/functions/getCalmTip";

const DS: CalmTipEntry[] = [
  // exact sleep 2-3 emotional
  {
    tip_id: "sleep_2-3_emotional_X",
    topic: "sleep",
    age_band: "2-3",
    user_type: "emotional",
    text: "sleep 2-3 emotional tip",
  },
  // same topic & user_type but 4-6
  {
    tip_id: "sleep_4-6_emotional_X",
    topic: "sleep",
    age_band: "4-6",
    user_type: "emotional",
    text: "sleep 4-6 emotional tip",
  },
  // same topic & age, different user_type
  {
    tip_id: "sleep_2-3_clarity_X",
    topic: "sleep",
    age_band: "2-3",
    user_type: "clarity",
    text: "sleep 2-3 clarity tip",
  },
  // different topic (limits)
  {
    tip_id: "limits_2-3_action_X",
    topic: "limits",
    age_band: "2-3",
    user_type: "action",
    text: "limits 2-3 action tip",
  },
];

describe("getCalmTip()", () => {
  test("returns exact match when topic+age+user_type exist", () => {
    const answers = { Q2: "2-3", Q3: "sleep", Q4: "I feel overwhelmed (emotional)" };
    const res = getCalmTip(answers, { dataset: DS, persistSnapshot: false });
    expect(res.tip.tip_id).toBe("sleep_2-3_emotional_X");
    expect(res.strategy).toBe("exact");
  });

  test("falls back to age 2-3 while keeping topic+user_type", () => {
    // Ask for <2 (no such record), topic sleep + emotional
    const answers = { Q2: "<2", Q3: "sleep", Q4: "I'm emotional" };
    const res = getCalmTip(answers, { dataset: DS, persistSnapshot: false });
    // Should pick the 2-3 entry that preserves topic + user_type
    expect(res.tip.tip_id).toBe("sleep_2-3_emotional_X");
    expect(res.strategy).toBe("age_fallback_2-3");
  });

  test("topic_any_age fallback preserves topic+user_type when age missing", () => {
    // Request 5-7 (unknown → parseAgeBand -> "2-3"), but ensure scenario:
    // simulate a classified result that doesn't have exact and 2-3 fallback.
    // We'll ask for user_type emotional but remove 2-3 emotional from dataset temporarily.
    const localDs: CalmTipEntry[] = DS.filter((d) => d.tip_id !== "sleep_2-3_emotional_X");
    const answers = { Q2: "unknown age", Q3: "sleep", Q4: "I feel emotional" };
    const res = getCalmTip(answers, { dataset: localDs, persistSnapshot: false });
    // Should pick topic_any_age → sleep 4-6 emotional
    expect(res.tip.tip_id).toBe("sleep_4-6_emotional_X");
    expect(res.strategy).toBe("topic_any_age");
  });

  test("age_exact_any_user fallback keeps topic+age when user_type missing", () => {
    // Ask for sleep 2-3 with user_type 'action' (not present for sleep 2-3)
    const answers = { Q2: "2-3", Q3: "sleep", Q4: "do now action" };
    const res = getCalmTip(answers, { dataset: DS, persistSnapshot: false });
    // Should pick sleep 2-3 clarity (same topic+age, any user)
    expect(res.tip.tip_id).toBe("sleep_2-3_clarity_X");
    expect(res.strategy).toBe("age_exact_any_user");
  });

  test("topic_only fallback chooses first tip in topic when nothing else matches", () => {
    // Ask for topic limits + age 4-6 + user_type indecisive (none exist)
    const answers = { Q2: "4-6", Q3: "limits", Q4: "not sure indecisive" };
    const res = getCalmTip(answers, { dataset: DS, persistSnapshot: false });
    expect(res.tip.tip_id).toBe("limits_2-3_action_X"); // only limits tip available
    expect(res.strategy).toBe("topic_only");
  });

  test("global_default returns first entry when dataset has no topic match", () => {
    const localDs: CalmTipEntry[] = DS.filter((d) => d.topic !== "sleep" && d.topic !== "limits");
    // localDs now empty -> global default = undefined behavior; ensure test dataset non-empty
    const fallbackDs: CalmTipEntry[] = [
      {
        tip_id: "meals_2-3_action_Y",
        topic: "meals",
        age_band: "2-3",
        user_type: "action",
        text: "meals tip",
      },
    ];
    const answers = { Q2: "4-6", Q3: "cooperation", Q4: "need clarity" };
    const res = getCalmTip(answers, { dataset: fallbackDs, persistSnapshot: false });
    expect(res.tip.tip_id).toBe("meals_2-3_action_Y");
    expect(res.strategy).toBe("global_default");
  });
});
