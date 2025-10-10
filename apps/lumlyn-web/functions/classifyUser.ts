// apps/lumlyn-web/functions/classifyUser.ts
// Determină user_type, topic și age_band pornind din răspunsurile quiz.
// - EN only (MVP)
// - Fără side-effects: doar transformă datele
// - Robustețe: acceptă atât id-uri (ex: "sleep"), cât și etichete ("Sleep / Rest").
//
// Answers așteptate (dar tolerant):
//  Q2: vârsta copilului (ex: "0-2", "2-3", "4-6", "0–2m", "under 2")
//  Q3: topicul (ex: "sleep" | "limits" | "cooperation" | "meals")
//  Q4: tipul de ajutor dorit (cuvinte-cheie pentru user_type)
//
// Dacă lipsesc informații, folosim fallback-urile:
//  - age_band -> "2-3"
//  - topic -> "sleep"
//  - user_type -> "clarity"
// Vezi și calm_tips.json pentru valori valide.

export type Topic = "sleep" | "limits" | "cooperation" | "meals";
export type AgeBand = "<2" | "2-3" | "4-6";
export type UserType = "emotional" | "clarity" | "action" | "indecisive" | "frequency";

export interface ClassifiedResult {
  user_type: UserType;
  topic: Topic;
  age_band: AgeBand;
}

/** Normalizează string (lowercase, fără diacritice, spații compacte) */
function norm(v?: unknown): string {
  return String(v ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Extrage banda de vârstă din Q2 (etichete diverse tolerate) */
export function parseAgeBand(input?: unknown): AgeBand {
  const s = norm(input);

  // Exemple tolerate: "0-2", "0 – 2", "0 to 2", "under 2", "0-2m", "0-24 months"
  if (
    /\b(under\s*2|0\s*[-–to_]\s*2|0-?24\s*months?|<\s*2)\b/.test(s) ||
    /\b0-?2m\b/.test(s)
  )
    return "<2";

  if (/\b(2\s*[-–to_]\s*3|2-?3\s*years?)\b/.test(s)) return "2-3";

  if (/\b(4\s*[-–to_]\s*6|4-?6\s*years?)\b/.test(s)) return "4-6";

  // Fallback preferat conform brief -> "2-3"
  return "2-3";
}

/** Map pentru topic (Q3) – tolerant la id sau label */
export function parseTopic(input?: unknown): Topic {
  const s = norm(input);
  if (/sleep|rest|bedtime/.test(s)) return "sleep";
  if (/limit|tantrum|boundar|rules?/.test(s)) return "limits";
  if (/cooperat|morning routine|get dressed|brush/.test(s)) return "cooperation";
  if (/meal|food|eat|picky|snack/.test(s)) return "meals";
  // fallback rezonabil
  return "sleep";
}

/** Heuristici pentru user_type (Q4 + orice alt text relevant).
 *  Reguli simple, deterministe; dacă apar mai multe potriviri, aplicăm o prioritate.
 */
const KEYWORDS: Record<UserType, RegExp> = {
  emotional: /(overwhelm|anx|stress|cry|feel|reassur|calm(?!\s*step))/,
  clarity: /(clear|step(?:s)?|what to do|exact|structure|plan)/,
  action: /(do now|practic|action|today|quick|immediat|start)/,
  indecisive: /(unsure|don'?t know|confus|maybe|not sure)/,
  frequency: /(often|every day|again|repeat|keeps|frequen)/,
};

// Prioritate când se potrivesc mai multe (poți schimba dacă ai reguli din doc):
const PRIORITY: UserType[] = ["clarity", "action", "emotional", "frequency", "indecisive"];

export function parseUserType(...inputs: Array<unknown>): UserType {
  const bag = inputs.map(norm).join(" | ");

  const hits = PRIORITY.filter((t) => KEYWORDS[t].test(bag));
  if (hits.length > 0) return hits[0];

  // Fallback sigur
  return "clarity";
}

/** Extrage valori dintr-un obiect answers care poate conține fie id-ul opțiunii, fie eticheta.
 *  Exemplu structură așteptată:
 *   answers = { Q2: "2-3", Q3: "sleep", Q4: "I need clear steps" }
 */
export function classifyUser(answers?: Record<string, any>): ClassifiedResult {
  const rawQ2 = answers?.Q2 ?? answers?.q2 ?? answers?.age ?? "";
  const rawQ3 = answers?.Q3 ?? answers?.q3 ?? answers?.topic ?? "";
  const rawQ4 = answers?.Q4 ?? answers?.q4 ?? answers?.help ?? "";

  const age_band = parseAgeBand(rawQ2);
  const topic = parseTopic(rawQ3);
  const user_type = parseUserType(rawQ4, rawQ3, rawQ2);

  return { user_type, topic, age_band };
}

export default classifyUser;
