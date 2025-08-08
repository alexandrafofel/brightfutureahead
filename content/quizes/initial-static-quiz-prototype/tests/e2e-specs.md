## 0) 🎯 Scop & criterii de reușită
### - Validăm cap-coadă că flow-ul respectă constrângerile, logica adaptivă și trackingul.
### - Pass gates (build mergeable):

  - ❇️ **6/6 întrebări**  parcurse, **max 1 adaptare**

  - ⏱️ **TTFI ≤4s, P95 answer ≤15s, Total P95 ≤80s**

  - ♿ A11y smoke OK (focus order + ```aria-live```)

  - 🧪 Evenimente unice & în ordine (intro → start → 6×answer → complete → CTA → tip_open)

## 1) 📦 Setup (Playwright)
- **Stack:**  Playwright **1.44+**, Node 18+

- **Artifacts on:** video=on, trace=on-first-retry, screenshot=only-on-failure

- **Env flags (remote config acceptate de app):**
  
  - ```force_intent = Norman|Torres|Neutral```

  - ```force_low_conf = true|false``` (simulează conf=0.4)

  - ```force_baby_wording = true|false```

  - ```quiz_adaptive_enabled = true|false``` (kill-switch)

- **Analytics stub:** intercept ```/events|/capture|/e``` → colectează în memorie pentru aserțiuni

## 2) 🔢 Matrice proiecte (dispozitive & rețea)
| Proiect           | Viewport | UA        | Rețea                             |
| ----------------- | -------- | --------- | --------------------------------- |
| **ios-se**        | 320×640  | iPhone SE | 4G (RTT 150ms, down 9Mb/s)        |
| **android-m**     | 360×740  | Pixel 5   | 4G (RTT 150ms, down 9Mb/s)        |
| **mobile-slow3g** | 360×640  | Generic   | Slow 3G (RTT 400ms, down 0.4Mb/s) |
| **desktop**       | 1280×800 | Chrome    | Wi-Fi (no throttling)             |


Rulezi toate proiectele în CI; local poți filtra cu ```--project```.

## 3) 🧭 Selectori & ancore test

- **Data-ids (obligatorii în UI):**
  
  - ```data-role="start_quiz"```

  - ```data-qid="Q1".. data-oid="O1"..```

  - ```data-branch="Norman|Torres|Neutral|Clarity_min"```

  - ```data-copy="out_norman_v1|..."```

  - ```data-cta="outro_primary"```

- **Semnale perf:** ```window.__perf = { lcp_ms, feedback_latency_ms }``` (populate de app)

- **Evenimente analytics:** POST ```/events``` (sau endpointul tău) cu body JSON

## 4) ⚙️ Config Playwright (excerpt)
```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 90_000,
  expect: { timeout: 5_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
    video: 'on',
    screenshot: 'only-on-failure',
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    timezoneId: 'Europe/Bucharest',
  },
  projects: [
    { name: 'ios-se', use: { ...devices['iPhone SE'], networkConditions: { download: 9*1024*1024, upload: 2*1024*1024, latency: 150 } } },
    { name: 'android-m', use: { ...devices['Pixel 5'], networkConditions: { download: 9*1024*1024, upload: 2*1024*1024, latency: 150 } } },
    { name: 'mobile-slow3g', use: { ...devices['Pixel 5'], networkConditions: { download: 400*1024, upload: 400*1024, latency: 400 } } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
});
```
## 5) 🧪 Helpers test (stub analytics + asserts)
```ts
// tests/utils.ts
import { Page, expect } from '@playwright/test';

export async function stubAnalytics(page: Page) {
  const events:any[] = [];
  await page.route(/\/(events|capture|e)(\?.*)?$/, async route => {
    const req = route.request();
    const body = req.method() === 'POST' ? JSON.parse(req.postData() || '{}') : {};
    events.push(body);
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });
  // expune în pagină pentru debug
  await page.exposeFunction('__getEvents', () => events);
  return events;
}

export async function assertEventOrder(page: Page) {
  const evts = await page.evaluate(() => (window as any).__getEvents?.());
  const names = JSON.stringify(evts.map((e:any) => e.event || e.name));
  expect(names).toMatch(/quiz_intro_shown.*quiz_start_clicked.*quiz_question_shown.*quiz_answer_submitted/s);
}

export async function clickOption(page: Page, qid: string, oid: string) {
  await page.getByTestId?.(`${qid}-${oid}`); // dacă folosiți testId
  await page.locator(`[data-qid="${qid}"] [data-oid="${oid}"]`).click();
}

export async function noScroll(page: Page) {
  const scrolled = await page.evaluate(() => document.scrollingElement?.scrollTop || 0);
  expect(scrolled).toBe(0);
}
```
## 6) 🧪 Scenarii E2E (spec-uri)
### 6.1 S1 — Happy path Norman (adaptare activată)
**Ținte:** adaptare 1×, outro ```out_norman_v1```, fără scroll, evenimente ordonate.
```ts
import { test, expect } from '@playwright/test';
import { stubAnalytics, clickOption, assertEventOrder, noScroll } from './utils';

test('S1 Norman – adaptare 1×, outro Norman', async ({ page }) => {
  await stubAnalytics(page);
  await page.goto('/?force_intent=Norman&quiz_adaptive_enabled=true');
  await page.getByRole('button', { name: /începem|hai să vedem/i }).click(); // start
  await clickOption(page, 'Q1', 'O1'); // emo_validare
  await clickOption(page, 'Q2', 'O3'); // 4–6 ani (nu baby)
  // Simulează mid-progress score 2 (app oferă slider/dialog)
  await page.evaluate(() => window.dispatchEvent(new CustomEvent('test:setMidScore',{detail:2})));
  // Așteaptă bloc adaptare
  await page.waitForSelector('[data-branch="Norman"]', { timeout: 5000 });
  // Continuă restul
  await clickOption(page, 'Q3', 'O1');
  await clickOption(page, 'Q4', 'O3');
  await clickOption(page, 'Q5', 'O2');
  await clickOption(page, 'Q6', 'O3');
  await noScroll(page);
  // Outro corect + CTA
  await page.waitForSelector('[data-copy="out_norman_v1"]');
  await page.locator('[data-cta="outro_primary"]').click();
  // tip open skeleton sub 1.5s
  const t0 = performance.now();
  await page.waitForSelector('[data-role="tip_opened"]', { timeout: 3000 });
  expect(performance.now() - t0).toBeLessThanOrEqual(1500);
  await assertEventOrder(page);
});
```

### 6.2 S2 — Happy path **Torres** (adaptare activă)
- **Flags:** `?force_intent=Torres&quiz_adaptive_enabled=true&force_low_conf=false`
- **Pași:** Q1 opțiune orientată spre acțiune → Q2 vârstă medie → mid-score ≤2
- **Așteptat:** apare o singură dată `[data-branch="Torres"]` • outro `out_torres_v1` • CTA click ⇒ tip_open ≤1500ms • evenimente în ordine

### 6.3 S3 — **Low-confidence fallback** (fără adaptare)
- **Flags:** `?force_intent=Neutral&force_low_conf=true`
- **Pași:** mid-score ≤2, **conf=0.4**
- **Așteptat:** **nu** apare `[data-branch]` • apare mesaj **Clarity_min** • outro `out_neutral_v1` • **fără** `quiz_adaptation_triggered`

### 6.4 S4 — **Baby wording** în outro
- **Flags:** `?force_baby_wording=true` *(sau alege Q2 <2y)*
- **Pași:** parcurge normal până la outro
- **Așteptat:** outro conține `out_baby_v1` (append/replace) • Final CTR contat pe `copy_id` corect

### 6.5 S5 — **No adapt** (progres bun)
- **Flags:** `?force_intent=Torres&force_low_conf=false`
- **Pași:** mid-score ≥3
- **Așteptat:** 0 adaptări • `[data-branch]` absent • outro pe intent (`out_torres_v1`/`out_neutral_v1`)

### 6.6 S6 — **Back/forward & resume**
- **Flags:** —
- **Pași:** mergi la Q3 → Back la Q2 → schimbă răspunsul → revino
- **Așteptat:** selecțiile persistă • **nu** se dublează `quiz_question_shown` • ordinea evenimentelor rămâne validă

### 6.7 S7 — **Debounce** pe CTA outro
- **Flags:** —
- **Pași:** dublu-click rapid pe CTA din outro
- **Așteptat:** **un singur** `quiz_cta_clicked` • fără dublu `tip_open` • buton dezactivat ~500ms

### 6.8 S8 — **Latency Slow3G** (perf guard)
- **Project:** `mobile-slow3g`
- **Pași:** click CTA ⇒ încarcă tip
- **Așteptat:** skeleton vizibil • `feedback_latency_ms ≤ 1500` (P95) • fără reflow deranjant

### 6.9 S9 — **Small device 320×640** (no scroll)
- **Project:** `ios-se` (320×640)
- **Pași:** parcurge toate întrebările
- **Așteptat:** **fără scroll** pe ecranul de întrebare • opțiuni min-height 56px (wrap 2 linii ok) • CTA above the fold

### 6.10 S10 — **A11y smoke** (VoiceOver/TalkBack)
- **Flags:** —
- **Pași:** activează VO/TB, parcurge un scenariu complet
- **Așteptat:** focus order logic • elemente anunțate corect (heading/button) • adaptarea anunțată prin `aria-live`

### 6.11 S11 — **Offline la CTA** (retry 1×)
- **Flags:** —
- **Pași:** simulează offline la click CTA → revino online
- **Așteptat:** toast “Conexiune slabă…” • retry automat 1× • `tip_opened` ulterior • 1 singur `quiz_cta_clicked`

### 6.12 S12 — **Kill-switch** adaptare OFF
- **Flags:** `?quiz_adaptive_enabled=false`
- **Pași:** parcurge normal
- **Așteptat:** **niciun** `quiz_adaptation_triggered` • `[data-branch]` absent • outro pe intent • flow stabil

### 6.13 S13 — **Analytics sanity** (unicitate & ordine)
- **Flags:** —
- **Pași:** rulează un flow complet
- **Așteptat:** `quiz_intro_shown` 1×/session • `quiz_complete ≤1×` • ordine minimă: intro → start → 6×(shown+answer) → complete → CTA → tip_open

## 7) Outro copy + CTA — spec scurt (ready-to-ship)
- **Scop:** închide cu calm + claritate + acțiune în <10s; ținte: **Final CTR ≥70%**, **Activation ≥65%**, **TTV ≤30s**.
- **Copy IDs (≤140c):**  
  - Norman: `out_norman_v1`, `out_norman_v2`  
  - Torres: `out_torres_v1`, `out_torres_v2`  
  - Neutral/Confirm: `out_neutral_v1`, `out_confirm_v1`  
  - Micro-branch baby: `out_baby_v1` (wording append/replace)
- **Reguli servire:** `intent_profile → copy_id`; dacă `Q2<2y` adaugă `out_baby_v1`; **1 singur CTA**; fallback `neutral_v1`.
- **Figma:** text 18/24 Semibold (max 3 rânduri @320px), CTA 56px full-width r=12, gap 12px, contrast **AA**, focus-ring vizibil.
- **Perf:** prefetch Calm Tip pe Q6; feedback **P95 ≤1500ms** (skeleton + “Se încarcă…”).
- **Tracking:** `quiz_complete{copy_id,intent_profile}` → `quiz_cta_clicked{cta_id,cta_position:'outro',copy_id}` → `calm_tip_open{tip_id}`.

---

## 8) Verifici flow logic & UX — checklist esențial
- **State machine:** Intro → Q1→Q2 → (Q0.5 70%) → (Adaptare ≤7s, max 1) → Q3→Q4→Q5→Q6 → Outro → CTA → Tip.
- **Garduri:** trigger adaptare dacă `progress_mid_score ≤2` **și** `intent_confidence ≥0.6` **și** `cooldown=false`; altfel **Clarity_min**.
- **UX gates:** 6 întrebări, fără scroll @320×640; back păstrează selecții; **tap ≥48px**; spacing ≥16px; contrast **AA**; focus vizibil.
- **Timpi:** median Q ≤8.5s; **P95 ≤15s**; total **P95 ≤80s**; feedback **P95 ≤1500ms**; **LCP p75 ≤2.5s**.
- **Analytics unicitate:** `quiz_intro_shown` 1×; `quiz_complete ≤1×`; `quiz_adaptation_triggered ≤1×`; acoperire `quiz_answer_submitted ×6`.
- **Kill-switch:** `quiz_adaptive_enabled=false` ⇒ fără adaptare, `Clarity_min`.

---

## 9) Testezi cu 1–2 persoane — plan v2 (pre-lansare)
- **Participanți:** 2 (A: Norman-leaning, B: Torres/neutral) — seara 20:30–22:30, device propriu, Wi-Fi & 4G.
- **Flags control:** `force_intent`, `force_low_conf`, `force_baby_wording`, `adaptation_cooldown=1`; ordine contra-balansată (A: S1→S3→S4→S2; B: S2→S3→S4→S1).
- **Scenarii:** S1 Norman; S2 Torres; S3 Low-confidence fallback; S4 Baby wording.
- **Telemetrie & artefacte:** screen recording, HAR rețea, log `ttfi_ms`, `time_on_question_ms`, `feedback_latency_ms`, `copy_id`, `branch_applied`.
- **Măsurători:** **TTFI ≤4s**, median/Q ≤8.5s (P95 ≤15s), total **P95 ≤80s**, **tap eronate ≤1**, abandon 0.
- **Rubrică 0/1/2:** claritate pas final, naturalețe adaptare, vizibilitate CTA, fricțiune, încredere → **trecere ≥8/10**.
- **Go/No-Go:** Go = rubrică ≥8/10 & 0×P0/0×P1 & perf OK; altfel No-Go + fix.

---

## 10) Livrabil final în format async — pachet
- **Ce conține:** KPI & guardrails, Constrângeri & SLO, Copy bank (intro/outro), Întrebări+opțiuni+tags, Figma spec, Logică adaptivă, Teste, Tracking, Rollout, Runbook.
- **Fișiere:** `/copy/copy.csv`, `/content/questions.csv`, `/logic/state_machine.md`, `/tracking/tracking.yaml`, `/tests/e2e-specs.md`.
- **Structură repo:**
/quiz/
/copy/copy.csv
/content/questions.csv
/logic/state_machine.md
/tracking/tracking.yaml
/tests/e2e-specs.md
/runbook/incident.md


- **Rollout:** 5% → 25% → 50% → 100% (EET); alerte: completion_drop, feedback_p95 spike, tap_errors.
---

## 11) Tracking — rezumat (link: `/tracking/tracking.yaml`)
- **Evenimente cheie:** `quiz_intro_shown`, `quiz_start_clicked`, `quiz_question_shown`, `quiz_answer_submitted`, `quiz_intent_inferred`, `quiz_progress_update(70%)`, `quiz_adaptation_triggered`, `quiz_complete`, `quiz_cta_clicked(outro)`, `calm_tip_open`.
- **Derivate:** `completion_rate`, `final_ctr_outro`, `activation_rate (≤120s)`, `ttv_tip_median_sec`, `answer_time_median_ms by Q`.
- **Guardrails:** `lcp_p75 ≤2500ms`, `feedback_p95 ≤1500ms`, `tap_error_rate ≤1%`, `total_quiz_p95 ≤80s`, `per_question_p95 ≤15s`.
- **Alerte Slack:** completion_drop >5pp/1h; feedback_p95 >1500ms/30m; tap_error_rate >1.5%/30m.
- **Privacy:** fără PII; `session_id` UUIDv4; geo country_only.

---

## 12) E2E specs — rezumat (link: `/tests/e2e-specs.md`)
- **Proiecte:** `ios-se 320×640 (4G)`, `android-m 360×740 (4G)`, `mobile-slow3g`, `desktop`.
- **Scenarii:** **6.2→6.13** (Torres, Low-conf, Baby wording, No adapt, Back/Resume, Debounce, Latency, Small device, A11y, Offline retry, Kill-switch, Analytics sanity).
- **Pass gates:** 6/6 întrebări, **max 1 adaptare**, **TTFI ≤4s**, **P95 answer ≤15s**, **Total P95 ≤80s**, A11y smoke OK, evenimente unice & ordonate.
- **CI:** Playwright 1.44+, artefacte video+trace, rulează toate proiectele; fail triage P0/P1/P2.
```
