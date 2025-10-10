// apps/lumlyn-web/functions/getCalmTip.ts
// Selectează calm tip-ul corect pe baza răspunsurilor și aplică fallback-uri sigure.
// - Citește dataset-ul JSON (EN-only) din /data/calm_tips.json
// - Folosește classifyUser() pentru a obține { user_type, topic, age_band }
// - Aplică o ierarhie de fallback (menține topic + user_type, apoi age_band "2-3")
// - Opțional persistă un snapshot în sessionStorage (pentru consistență la refresh)

import classifyUser, {
  ClassifiedResult,
  UserType,
  Topic,
  AgeBand,
} from "@/functions/classifyUser";
// Dacă în tsconfig ai "resolveJsonModule": true, acest import merge direct.
import calmTips from "@/data/calm_tips.json";

export interface CalmTipEntry {
  tip_id: string;
  topic: Topic;
  age_band: AgeBand;
  user_type: UserType;
  text: string;
}

export interface CalmTipResult {
  tip: CalmTipEntry;
  classified: ClassifiedResult;
  /** cum am găsit rezultatul */
  strategy:
    | "exact"
    | "age_fallback_2-3"
    | "topic_any_age"
    | "age_exact_any_user"
    | "topic_only"
    | "global_default";
}

export interface GetCalmTipOptions {
  /** Snapshot în sessionStorage (default: true) */
  persistSnapshot?: boolean;
  /** Override dataset (pentru teste) */
  dataset?: CalmTipEntry[];
}

/** Helper: protejează accesul la window în SSR */
function hasWindow(): boolean {
  return typeof window !== "undefined";
}

/** Returnează dataset-ul ca tipat (utile pentru teste/unit) */
export function loadTips(dataset?: CalmTipEntry[]): CalmTipEntry[] {
  const raw = (dataset ?? (calmTips as unknown as CalmTipEntry[])) || [];
  // validare minimă (defensiv)
  return raw.filter(
    (e) =>
      !!e &&
      typeof e.tip_id === "string" &&
      (e.topic === "sleep" ||
        e.topic === "limits" ||
        e.topic === "cooperation" ||
        e.topic === "meals") &&
      (e.age_band === "<2" || e.age_band === "2-3" || e.age_band === "4-6") &&
      (e.user_type === "emotional" ||
        e.user_type === "clarity" ||
        e.user_type === "action" ||
        e.user_type === "indecisive" ||
        e.user_type === "frequency") &&
      typeof e.text === "string"
  );
}

/** Predicat util */
const eq = <T extends string>(a: T, b: T) => a === b;

/** Ierarhia de fallback (în ordinea încercărilor):
 *  1) exact topic + age_band + user_type
 *  2) topic + age_band=2-3 + user_type (fallback de vârstă, păstrând restul)
 *  3) topic + orice age_band, dar user_type păstrat
 *  4) topic + age_band exact, dar orice user_type
 *  5) topic doar (primul din topic)
 *  6) global default (primul din dataset)
 */
function pickTip(
  entries: CalmTipEntry[],
  c: ClassifiedResult
): CalmTipResult {
  const exact = entries.find(
    (e) => eq(e.topic, c.topic) && eq(e.age_band, c.age_band) && eq(e.user_type, c.user_type)
  );
  if (exact) return { tip: exact, classified: c, strategy: "exact" };

  const ageFallback = entries.find(
    (e) => eq(e.topic, c.topic) && eq(e.age_band, "2-3") && eq(e.user_type, c.user_type)
  );
  if (ageFallback)
    return { tip: ageFallback, classified: c, strategy: "age_fallback_2-3" };

  const topicAnyAge = entries.find(
    (e) => eq(e.topic, c.topic) && eq(e.user_type, c.user_type)
  );
  if (topicAnyAge)
    return { tip: topicAnyAge, classified: c, strategy: "topic_any_age" };

  const ageExactAnyUser = entries.find(
    (e) => eq(e.topic, c.topic) && eq(e.age_band, c.age_band)
  );
  if (ageExactAnyUser)
    return { tip: ageExactAnyUser, classified: c, strategy: "age_exact_any_user" };

  const topicOnly = entries.find((e) => eq(e.topic, c.topic));
  if (topicOnly) return { tip: topicOnly, classified: c, strategy: "topic_only" };

  // global fallback: primul din dataset (determinist)
  const first = entries[0];
  return {
    tip: first,
    classified: c,
    strategy: "global_default",
  };
}

/** API principal:
 *   getCalmTip(answers, { persistSnapshot?: true, dataset? })
 */
export function getCalmTip(
  answers?: Record<string, any>,
  opts?: GetCalmTipOptions
): CalmTipResult {
  const dataset = loadTips(opts?.dataset);
  const classified = classifyUser(answers);

  const result = pickTip(dataset, classified);

  // Persistență în sesiune (consistență la refresh)
  if (opts?.persistSnapshot !== false && hasWindow()) {
    try {
      const payload = {
        tip_id: result.tip.tip_id,
        user_type: result.classified.user_type,
        topic: result.classified.topic,
        age_band: result.classified.age_band,
        strategy: result.strategy,
        shown_at: Date.now(),
      };
      sessionStorage.setItem("lumlyn_calm_tip", JSON.stringify(payload));
    } catch {
      // ignore storage failures
    }
  }

  return result;
}

export default getCalmTip;
