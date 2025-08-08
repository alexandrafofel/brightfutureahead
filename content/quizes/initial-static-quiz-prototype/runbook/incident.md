# /runbook/incident.md
> Quiz Intro – **Runbook incidente** (Top 0.1% async)  
> Versiune: v1.0 • Timezone: Europe/Bucharest • Status: ready-to-use

---

## 0) Meta
- **Scope:** incidente care afectează Completion, CTR outro, Activation, TTV, timpi/perf sau tracking.
- **SLO-uri cheie:** LCP p75 ≤2.5s • Feedback P95 ≤1500ms • P95 total ≤80s • Tap-error ≤1% • Events unice.
- **TTA/TTR ținte:** **Ack ≤10 min** • **Mitigare ≤60 min** • **RCA ≤48 h**.

**Echipa (placeholders):**
- **On-call Eng:** `@eng-oncall`
- **PM Owner:** `@pm-owner`
- **Design/A11y:** `@design`
- **Data/Analytics:** `@data`
- **Comms:** `@comms` (Slack #announcements-internal)

---

## 1) Matrice severitate
| Sev | Definiție | Exemple | Comms |
|---|---|---|---|
| **P0** | Impact major, clienți blocați sau KPI North Star afectat >10pp | CTR outro -15pp; tip nu se deschide; crash; PII colectată | Alertă + War-room + Postmortem |
| **P1** | Impact moderat, degradare sub SLO/guardrails | Feedback P95 >1500ms; Completion -6pp; tracking duplicat | Alertă + Fix în aceeași zi |
| **P2** | Polish/minor | Text overflow, micro-copii greșite | Backlog sprint |

---

## 2) Alert matrix (auto)
| Alertă | Prag | Sursă | Severitate | Acțiune inițială |
|---|---|---|---|---|
| `completion_drop` | -5pp / 1h vs control | Dashboard | P1–P0 | Triage KPI + verifică adaptive |
| `feedback_latency_spike` | P95 >1500ms / 30m | Perf probe | P1 | Triage perf + degrade grațios |
| `tap_errors_high` | >1.5% / 30m | Events | P1 | UI QA + hotfix hit areas |
| `activation_drop` | -10pp / 1h | Funnel | P0 | Verifică tip service + retry |
| `events_gap` | -20% volum / 30m | Ingestion | P1 | Switch la buffer local + retry |
| `dup_events` | >1.1× așteptat / 30m | Ingestion | P1 | De-dup + fix emit once |
| `lcp_p75_regression` | >2500ms / 1h | RUM | P1 | Disable non-crit assets |

---

## 3) Triage în **15 minute** (checklist)
1. **Confirma alertă** (grafice live 1h & 24h) • marchează Sev P0/P1/P2.  
2. **Context release:** ultimul `build_hash`, feature flags active, trafic/geo spikes.  
3. **Sondează 3 sesiuni reale** (session replay/loguri) – vezi ordinea evenimentelor.  
4. **Determină vectorul:** *perf, tracking, logică, conținut, serviciu extern*.  
5. **Alege playbook-ul** (secțiunea 4) • **pornește mitigarea** în ≤10 min.  
6. **Comunică în #quiz-war-room:** status, ipoteză, ETA mitigare.

---

## 4) Playbook-uri incidente

### 4.1 CTR outro scade ≥10pp (P0)
**Simptome:** `final_ctr_outro` drop; `quiz_cta_clicked` scade, `quiz_complete` stabil.
1) **Verifică copy_id** servit (A/B greșit?); compara `intent_profile → copy`.
2) **Mitigare imediată (5 min):**  
   ```json
   { "quiz_adaptive_enabled": true, "intent_conf_threshold": 0.7, "force_outro_copy": "out_neutral_v1" }
   ```
– temporar forțează `out_neutral_v1` (cel mai stabil).

3) **QA rapid:** 10 sesiuni interne; verifică vizibilitatea CTA (above the fold).
4) **Root cause candidate:** copy nou defect, bug stratificare intent, CSS push.
5) **Re-enable:** reintrodu copy câștigător gradual 25% → 50% → 100%.

### 4.2 Activation scade ≥10pp (P0)
- **Simptome:** `calm_tip_open` nu urmează `quiz_cta_clicked` (gap mare).
- **Pași:**
  1) **Probe:** 404/5xx pe endpoint tip (console) • exportă HAR.
  2) **Mitigare (≤10 min):**
     ```json
     { "retry_on_tip_open": true, "retry_count": 1, "fallback_tip_static_enabled": true }
     ```
     ↳ Activează retry 1× și fallback tip static (“Temporar îți arătăm varianta offline.”).
  3) **Contact:** `@eng-tip` (serviciul de tip).
  4) **RCA candidate:** versiune API, CORS, ratelimiting, timeout edge.

---

### 4.3 Feedback P95 >1500ms (P1)
- **Diag perf:** verifică `TTFB p95`, payload, imagini/POP.
- **Mitigare (≤10 min):**
  ```json
  { "latency_feedback_threshold_ms": 1500, "prefetch_enabled": false, "intro_images_enabled": false }
  ```
↳ Dezactivează prefetch & imaginile intro; păstrează skeleton.

- **Optimizări:** cache headers, comprima tip JSON, defer JS non-critic.

  ### 4.4 Completion -6pp (P1)
- **Segmentare:** device • sursă trafic • geo • variant.
- **Ipoteze:** TTFI >4s • copy intro schimbat • tap-error ↑ • adaptare intruzivă.
- **Mitigare:**
  - Setează **`intro_B`** (balanced) ca **default**.
  - Reduce `midcheck_sample_rate` **0.7 → 0.5** (mai puțină fricțiune).
  - Dacă `tap_error_rate > 1%` → crește tap target la **60px** (flag UI).

---

### 4.5 Tap-error >1.5% (P1)
- **Verifică:** device mic • font-scale >1.2 • overlay-uri/hitbox.
- **Mitigare (≤10 min):** `button_height_px: 60`, `spacing_px: 20`, wrap max 2 linii; debounce pe butoane.
- **Asigură:** hitbox fără overlap; focus-ring vizibil.

---

### 4.6 Adaptive misrouting (intent greșit)
- **Simptome:** ton nepotrivit • CTR scăzut pe segment.
- **Check:** `intent_confidence` medie • distribuția `branch_applied` • `progress_mid_score`.
- **Mitigare:** crește `intent_conf_threshold` **0.6 → 0.75**; menține **cooldown=1**.
- **Fallback (kill adaptive):**
  ```json 
  { "quiz_adaptive_enabled": false, "force_branch": "Clarity_min" }

--- 

### 4.7 Tracking outage / duplicate (P1)
- **Semne:** volum evenimente **-20%** sau **+10%** vs baseline.
- **Mitigare:**
  - Buffer local 5 min + re-trimitere.
  - De-dup: nu emite `quiz_intro_shown` dacă există în sesiune.
  - Guard **emit-once** pe `session_id`.
- **Backfill:** din batch logs dacă există.

---

### 4.8 Intro TTFI >4s (P1)
- **Perf:** LCP p75, font blocking, third-party.
- **Mitigare (≤5 min):** system font stack • lazy icon ≤12KB • dezactivează third-party non-critic.

---

### 4.9 A11y regression (P1)
- **Simptome:** focus pierdut la adaptare • VoiceOver/TalkBack nu anunță.
- **Mitigare:** `aria-live="polite"` pe containerul adaptării • mută focus pe `QuestionText` după inserție • CTA `role="button"`.

---

### 4.10 PII accidental (P0 – privacy)
- **Oprește colectarea:**
  ```json json
  { "drop_params": ["email","phone","name"], "telemetry_ingest_paused": true }
  ```
Containment: șterge batch-ul din tool; notează intervalul afectat.
- **Comms:** alertează legal/compliance; audit pe 24h.
- **Fix:** validări în CI (validation_rules) + test de regresie tracking.

---

## 5) Kill-switch & degrade grațios

- **Adaptive OFF (instant):**
  ```json json
  { "quiz_adaptive_enabled": false, "force_branch": "Clarity_min" }
  ```
- **Perf degrade:**
 { "intro_images_enabled": false, "prefetch_enabled": false, "skeleton_enabled": true }
- **CTA debounce:**
{ "cta_debounce_ms": 500 }
- **Verificare (≤5 min):** 10 sesiuni interne → fără `[data-branch]`, **feedback <1500ms**, funnel stabil.

## 6) War-room & comunicare

- **Canal:** `#quiz-war-room` (invitați: On-call Eng, PM Owner, Data/Analytics, Design/A11y, Comms).
- **Owner & Scribe:** desemnează **Owner** (decizii) și **Scribe** (update-uri & timeline).
- **Cadentă update:** la **15 min** până la mitigare, apoi **hourly** până la închidere.
- **Comms interne:** sumar scurt în `#announcements-internal` după stabilizare.


**Template mesaj inițial:**
```pgsql
[INCIDENT] <titlu scurt> — Start <HH:MM EET>
Simptome: <ce se vede>
Impact: <metrică & delta față de baseline>
Sev: P0/P1

Ipoteză curentă: <1–2 fraze>
Acțiuni în curs: <mitigări/diag>
Următorul update: +15 min
Owner: <nume> | Scribe: <nume>
```


**Template update (q15 min):**
```pgsql
[UPDATE] HH:MM
Ce s-a schimbat: <metrice, grafice>
Ce am făcut: <toggling/patch/rollback>
Ce urmează: <pas următor + ETA>
Blockers/Riscuri: <dacă există>
```
