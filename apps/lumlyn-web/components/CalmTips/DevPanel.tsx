"use client";

/**
 * DevPanel – helper vizibil doar în development:
 *  - afișează meta despre calm tip (tip_id, topic, age_band, user_type, strategy)
 *  - arată valorile persistate (local/session)
 *  - butoane de reset pentru storage & secvență outro
 *
 * Integrare (opțional, în app/quiz/tips/page.tsx):
 *   {process.env.NODE_ENV !== "production" && (
 *     <div className="mt-6 w-full max-w-[680px]">
 *       <DevPanel />
 *     </div>
 *   )}
 */

import * as React from "react";
import { Button } from "@/components/Button/button";

type Snapshot = {
  tip_id?: string;
  topic?: string;
  age_band?: string;
  user_type?: string;
  strategy?: string;
  shown_at?: number;
};

function readJSON<T>(store: Storage | null, key: string): T | null {
  if (!store) return null;
  try {
    const raw = store.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function hasWindow(): boolean {
  return typeof window !== "undefined";
}

export default function DevPanel(): JSX.Element | null {
  if (process.env.NODE_ENV === "production") return null;

  const [ls, setLs] = React.useState<Record<string, string>>({});
  const [ss, setSs] = React.useState<Record<string, string>>({});
  const [snapshot, setSnapshot] = React.useState<Snapshot | null>(null);
  const [outroSeq, setOutroSeq] = React.useState<string>("(n/a)");

  const refresh = React.useCallback(() => {
    if (!hasWindow()) return;
    try {
      const lsObj: Record<string, string> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)!;
        lsObj[k] = localStorage.getItem(k) ?? "";
      }
      setLs(lsObj);
    } catch {
      setLs({});
    }
    try {
      const ssObj: Record<string, string> = {};
      for (let i = 0; i < sessionStorage.length; i++) {
        const k = sessionStorage.key(i)!;
        ssObj[k] = sessionStorage.getItem(k) ?? "";
      }
      setSs(ssObj);
    } catch {
      setSs({});
    }

    try {
      setSnapshot(readJSON<Snapshot>(sessionStorage, "lumlyn_calm_tip"));
    } catch {
      setSnapshot(null);
    }
    try {
      setOutroSeq(localStorage.getItem("lumlyn_outro_seq") ?? "(n/a)");
    } catch {
      setOutroSeq("(n/a)");
    }
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  const clearAnswers = () => {
    try {
      localStorage.removeItem("lumlyn_quiz_answers");
      sessionStorage.removeItem("lumlyn_quiz_answers");
    } catch {}
    refresh();
  };

  const clearSnapshot = () => {
    try {
      sessionStorage.removeItem("lumlyn_calm_tip");
    } catch {}
    refresh();
  };

  const resetOutroSeq = () => {
    try {
      localStorage.setItem("lumlyn_outro_seq", "0");
    } catch {}
    refresh();
  };

  const clearAll = () => {
    try {
      localStorage.clear();
    } catch {}
    try {
      sessionStorage.clear();
    } catch {}
    refresh();
  };

  return (
    <section className="rounded-2xl border border-dashed border-black/20 bg-white/70 p-4">
      <header className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#1A1A1A]">Dev Panel — Calm Tips</h3>
        <div className="flex gap-2">
          <Button variant="secondary" className="h-8 px-3 text-sm" onClick={refresh}>
            Refresh
          </Button>
          <Button variant="secondary" className="h-8 px-3 text-sm" onClick={clearAll}>
            Clear ALL storage
          </Button>
        </div>
      </header>

      {/* Snapshot */}
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-black/5 p-3">
          <h4 className="text-sm font-semibold text-[#111]">Current Calm Tip Snapshot</h4>
          {snapshot ? (
            <ul className="mt-2 text-sm leading-6">
              <li>
                <span className="font-semibold">tip_id:</span> {snapshot.tip_id}
              </li>
              <li>
                <span className="font-semibold">topic:</span> {snapshot.topic}
              </li>
              <li>
                <span className="font-semibold">age_band:</span> {snapshot.age_band}
              </li>
              <li>
                <span className="font-semibold">user_type:</span> {snapshot.user_type}
              </li>
              <li>
                <span className="font-semibold">strategy:</span> {snapshot.strategy}
              </li>
              <li>
                <span className="font-semibold">shown_at:</span>{" "}
                {snapshot.shown_at ? new Date(snapshot.shown_at).toLocaleString() : "-"}
              </li>
            </ul>
          ) : (
            <p className="mt-2 text-sm text-[#667085]">No snapshot found.</p>
          )}

          <div className="mt-2 flex gap-2">
            <Button variant="secondary" className="h-8 px-3 text-sm" onClick={clearSnapshot}>
              Clear snapshot
            </Button>
          </div>
        </div>

        <div className="rounded-xl bg-black/5 p-3">
          <h4 className="text-sm font-semibold text-[#111]">Outro sequence</h4>
          <p className="mt-2 text-sm">
            <span className="font-semibold">lumlyn_outro_seq:</span> {outroSeq}
          </p>
          <div className="mt-2 flex gap-2">
            <Button variant="secondary" className="h-8 px-3 text-sm" onClick={resetOutroSeq}>
              Reset to 0 (v1)
            </Button>
          </div>
        </div>
      </div>

      {/* Storage viewers */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-black/5 p-3">
          <h4 className="text-sm font-semibold text-[#111]">localStorage</h4>
          <pre className="mt-2 max-h-64 overflow-auto rounded bg-white p-2 text-xs leading-relaxed">
{JSON.stringify(ls, null, 2)}
          </pre>
          <div className="mt-2 flex gap-2">
            <Button variant="secondary" className="h-8 px-3 text-sm" onClick={clearAnswers}>
              Clear quiz answers
            </Button>
          </div>
        </div>

        <div className="rounded-xl bg-black/5 p-3">
          <h4 className="text-sm font-semibold text-[#111]">sessionStorage</h4>
          <pre className="mt-2 max-h-64 overflow-auto rounded bg-white p-2 text-xs leading-relaxed">
{JSON.stringify(ss, null, 2)}
          </pre>
        </div>
      </div>
    </section>
  );
}
