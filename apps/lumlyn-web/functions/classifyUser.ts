// apps/lumlyn-web/functions/classifyUser.ts
// FIX: interpretează corect răspunsurile când sunt stocate ca *ID-uri de opțiuni*
//      folosind schema din quizQuestions (Q2/Q3/Q4).

import { quizQuestions } from "@/app/quiz/messages/quiz-options";

export type Topic = "sleep" | "limits" | "cooperation" | "meals";
export type AgeBand = "<2" | "2-3" | "4-6";
export type UserType = "emotional" | "clarity" | "action" | "indecisive" | "frequency";

export interface ClassifiedResult {
  user_type: UserType;
  topic: Topic;
  age_band: AgeBand;
}

/* -------------------- helpers -------------------- */

function norm(v?: unknown): string {
  return String(v ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function findOptionLabel(qid: string, oid?: string): string | undefined {
  if (!qid || !oid) return;
  const q = quizQuestions.find((x) => x.id === qid);
  const opt = q?.options?.find((o) => o.id === oid);
  return (opt?.label ?? (opt as any)?.text ?? (opt as any)?.value) as string | undefined;
}

/* Q2 – vârstă */
export function parseAgeBandFromIdOrLabel(q2Id?: string, q2Label?: string): AgeBand {
  const s = norm(q2Label || q2Id);

  if (
    /\b(under\s*2|0\s*[-–to_]\s*2|0-?24\s*months?|<\s*2)\b/.test(s) ||
    /\b0-?2m\b/.test(s) ||
    /\b(0[_-]?2|lt2|under2)\b/.test(s)
  )
    return "<2";

  if (/\b(2\s*[-–to_]\s*3|2-?3\s*years?)\b/.test(s) || /\b(2[_-]?3|age2?3)\b/.test(s))
    return "2-3";

  if (/\b(4\s*[-–to_]\s*6|4-?6\s*years?)\b/.test(s) || /\b(4[_-]?6|age4?6)\b/.test(s))
    return "4-6";

  return "2-3"; // fallback preferat
}

/* Q3 – topic */
export function parseTopicFromIdOrLabel(q3Id?: string, q3Label?: string): Topic {
  const s = norm(q3Label || q3Id);
  if (/sleep|rest|bedtime/.test(s) || /\bsleep\b|q3_sleep|opt_sleep/.test(s)) return "sleep";
  if (/limit|tantrum|boundar|rules?/.test(s) || /limits?|tantrums?|q3_limits?/.test(s)) return "limits";
  if (/cooperat|morning|dress|brush/.test(s) || /cooperation|q3_coop/.test(s)) return "cooperation";
  if (/meal|food|eat|picky|snack/.test(s) || /meals?|q3_meals?/.test(s)) return "meals";
  return "sleep";
}

/* Q4 – user type (help style) */
const KEYWORDS: Record<UserType, RegExp> = {
  emotional: /(overwhelm|anx|stress|cry|feel|reassur|calm(?!\s*step))/,
  clarity: /(clear|step(?:s)?|exact|structure|plan|what to do)/,
  action: /(do now|practic|action|today|quick|immediat|start)/,
  indecisive: /(unsure|don'?t know|confus|maybe|not sure)/,
  frequency: /(often|every day|again|repeat|keeps|frequen)/,
};
const PRIORITY: UserType[] = ["clarity", "action", "emotional", "frequency", "indecisive"];

export function parseUserTypeFromIdOrLabel(q4Id?: string, q4Label?: string): UserType {
  const bag = [q4Id, q4Label].map(norm).join(" | ");
  const hit = PRIORITY.find((t) => KEYWORDS[t].test(bag));
  if (hit) return hit;

  // suportă ID-uri descriptive (ex. help_clarity, want_action etc.)
  if (/\bclarit(y|y_)?\b|help[_-]?clar/i.test(bag)) return "clarity";
  if (/\baction\b|do[_-]?now/i.test(bag)) return "action";
  if (/\bemotion|reassur/i.test(bag)) return "emotional";
  if (/\bfrequen|often|again/i.test(bag)) return "frequency";
  if (/\bindecis|unsure|not[_-]?sure/i.test(bag)) return "indecisive";

  return "clarity";
}

/* -------------------- API principal -------------------- */

export function classifyUser(
  answers?: Record<string, any>
): ClassifiedResult {
  // acceptă atât ID-uri cât și texte
  const q2id = answers?.Q2 ?? answers?.q2 ?? answers?.age ?? "";
  const q3id = answers?.Q3 ?? answers?.q3 ?? answers?.topic ?? "";
  const q4id = answers?.Q4 ?? answers?.q4 ?? answers?.help ?? "";

  const q2label = findOptionLabel("Q2", q2id);
  const q3label = findOptionLabel("Q3", q3id);
  const q4label = findOptionLabel("Q4", q4id);

  const age_band = parseAgeBandFromIdOrLabel(String(q2id), q2label);
  const topic = parseTopicFromIdOrLabel(String(q3id), q3label);
  const user_type = parseUserTypeFromIdOrLabel(String(q4id), q4label);

  return { user_type, topic, age_band };
}

export default classifyUser;
