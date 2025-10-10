// apps/lumlyn-web/functions/persistQuizAnswers.ts
// Safe helpers to persist & read quiz answers in web storage.
// - Uses localStorage when available, falls back to sessionStorage.
// - No-SSR guards (safe to import in client components).
// - Minimal, deterministic keys.

const KEY = "lumlyn_quiz_answers";

/** True when running in a browser. */
function hasWindow(): boolean {
  return typeof window !== "undefined";
}

/** Returns localStorage or sessionStorage (whichever is available). */
function getStore(): Storage | null {
  if (!hasWindow()) return null;
  try {
    // Prefer localStorage for cross-tab persistence
    return window.localStorage ?? window.sessionStorage ?? null;
  } catch {
    // Some environments block access; try sessionStorage
    try {
      return window.sessionStorage ?? null;
    } catch {
      return null;
    }
  }
}

/** Read full answers object. Returns empty object if missing/invalid. */
export function loadAnswers<T extends Record<string, any> = Record<string, any>>(): T {
  const store = getStore();
  if (!store) return {} as T;
  try {
    const raw = store.getItem(KEY);
    if (!raw) return {} as T;
    const obj = JSON.parse(raw);
    return (obj && typeof obj === "object" ? obj : {}) as T;
  } catch {
    return {} as T;
  }
}

/** Write full answers object (overwrites). */
export function saveAnswers<T extends Record<string, any>>(answers: T): void {
  const store = getStore();
  if (!store) return;
  try {
    store.setItem(KEY, JSON.stringify(answers ?? {}));
  } catch {
    // ignore quota or privacy errors
  }
}

/** Merge a single answer (qid → value) into stored object. */
export function mergeAnswer(qid: string, value: any): void {
  if (!qid) return;
  const prev = loadAnswers();
  const next = { ...prev, [qid]: value };
  saveAnswers(next);
}

/** Remove all stored answers. */
export function clearAnswers(): void {
  const store = getStore();
  if (!store) return;
  try {
    store.removeItem(KEY);
  } catch {
    // ignore
  }
}

/** Convenience: ensure a key exists (initialize with empty object if missing). */
export function ensureAnswers(): void {
  const store = getStore();
  if (!store) return;
  try {
    if (store.getItem(KEY) == null) store.setItem(KEY, "{}");
  } catch {
    // ignore
  }
}

export default {
  loadAnswers,
  saveAnswers,
  mergeAnswer,
  clearAnswers,
  ensureAnswers,
};
