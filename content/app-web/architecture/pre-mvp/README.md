<p align="center">
  <img src="./lumlyn-logo-512.png" alt="Lumlyn Logo" width="200"/>
</p>

# Lumlyn — Pre-MVP Architecture

Acest folder conține **diagramele oficiale** pentru pre-MVP.  
Sunt menținute în trei formate:
- **.mmd** — sursa în Mermaid (versionabilă)
- **.drawio** — editabil în diagrams.net
- **.png** — export pentru prezentări/README

> Scop pre-MVP: quiz adaptiv mobil-first, colectare răspunsuri + email, tracking minim (PostHog), fără testare automată (manual only).

---

## 1) C4 Context

![C4 Context](./c4-context.png)

- **Fișiere:** [`c4-context.mmd`](./c4-context.mmd) • [`c4-context.drawio`](./c4-context.drawio)
- **Folosire (tickets):** AIT-507 (Pre-MVP Architecture), AIT-470 (FE prototype), AIT-524/AIT-510 (BE integration), AIT-511 (Analytics)
- **Ce arată:** actorii externi și limitele de încredere: User → Web App, CDN/Edge, Supabase (Edge Functions + DB), PostHog, Email Provider.

---

## 2) Component Diagram (high-level)

![Component Diagram](./component-diagram.png)

- **Fișiere:** [`component-diagram.mmd`](./component-diagram.mmd) • [`component-diagram.drawio`](./component-diagram.drawio)
- **Folosire:** AIT-470 (FE), AIT-524/AIT-510 (BE), AIT-509 (DB), AIT-511 (Analytics)
- **Ce arată:** blocurile principale și direcțiile de comunicare: Frontend (Next.js), Supabase API, DB, PostHog, Email, CMS (opțional).

---

## 3) Component Diagram — **Detailed**

![Component Detailed](./component-detailed-diagram.png)

- **Fișiere:** [`component-detailed-diagram.mmd`](./component-detailed-diagram.mmd) • [`component-detailed-diagram.drawio`](./component-detailed-diagram.drawio)
- **Folosire:** AIT-470 (FE flow, UTM parser, state engine), AIT-524/AIT-510 (API endpoints), AIT-511/506 (tracking + funnel)
- **Ce arată:** componente FE (intro, Q1–Q6, MidCheck, Adaptation, Outro, Email capture, UTM parser, tracking), API-urile, tabelele DB și conexiunile spre PostHog/Email.

---

## 4) Deployment View

![Deployment](./deployment-view.png)

- **Fișiere:** [`deployment-view.mmd`](./deployment-view.mmd) • [`deployment-view.drawio`](./deployment-view.drawio)
- **Folosire:** AIT-507 (arhitectură), AIT-524/AIT-510 (Edge Functions & secrets), AIT-511/506 (endpoints PostHog), Ops (uptime/alerts)
- **Ce arată:** unde rulează fiecare componentă (Vercel Edge, Supabase Edge Functions, Postgres, PostHog Cloud, Email provider), chei/roluri (anon vs service role), job-ul de export.

---

## 5) State Machine (quiz flow)

![State Machine](./state-machine.png)

- **Fișiere:** [`state-machine.mmd`](./state-machine.mmd) • [`state-machine.drawio`](./state-machine.drawio)
- **Folosire:** AIT-470 (FE prototype), AIT-469 (UI/UX), AIT-504 (pilot test)
- **Ce arată:** Intro → Q1–Q6 → MidCheck → AdaptationBlock (max 1) → Outro, cu garduri (score/conf, sample rate, baby wording).

---

## 6) Sequence Diagram (E2E)

![Sequence](./sequence-diagram.png)

- **Fișiere:** [`sequence-diagram.mmd`](./sequence-diagram.mmd) • [`sequence-diagram.drawio`](./sequence-diagram.drawio)
- **Folosire:** AIT-524/AIT-510 (FE↔API↔DB integrări), AIT-511 (event order minim)
- **Ce arată:** User → FE → GET /quiz → POST /quiz → POST /lead → PostHog capture → Email provider.

---

## 7) ERD (DB schema minimă)

![ERD](./ERD.png)

- **Fișiere:** [`ERD.mmd`](./ERD.mmd) • [`ERD.drawio`](./ERD.drawio)
- **Folosire:** AIT-509 (schema DB), AIT-524/AIT-510 (inserts), AIT-511 (corelații evenimente)
- **Ce arată:** USERS, QUIZ_SESSIONS, QUIZ_ANSWERS, LEADS (+ COPY_TEXT, QUESTIONS, REMOTE_CONFIG).

---

## 8) Data Flow

![Data Flow](./data-flow.png)

- **Fișiere:** [`data-flow.mmd`](./data-flow.mmd) • [`data-flow.drawio`](./data-flow.drawio)
- **Folosire:** AIT-511/506 (analytics funnel), AIT-524/AIT-510 (payload-uri), Ops (export ML)
- **Ce arată:** traseul datelor: device → API/DB → PostHog (fără PII) → export JSON/CSV → ML staging → GDPR delete path.

---

## 9) RLS & Access Control

![RLS](./rls.png)

- **Fișiere:** [`rls.mmd`](./rls.mmd) • [`rls.drawio`](./rls.drawio)
- **Folosire:** AIT-509 (RLS on, politici), AIT-524/AIT-510 (folosirea service role în Edge Functions)
- **Ce arată:** separarea rolurilor (FE cu anon key doar prin API, Edge Functions cu service role), fără acces direct al FE la tabele sensibile.

---

## 10) Incident / Observability Flow

![Incident Flow](./incident-flow.png)

- **Fișiere:** [`incident-flow.mmd`](./incident-flow.mmd) • [`incident-flow.drawio`](./incident-flow.drawio)
- **Folosire:** AIT-506 (dashboard & alerte), AIT-511 (event naming), runbook
- **Ce arată:** colectare evenimente → dashboards → Slack alerts → acțiuni din runbook (flags/kill-switch).

---

## 11) Feature Flags Map

![Feature Flags Map](./feature-flags-map.png)

- **Fișiere:** [`feature-flags-map.mmd`](./feature-flags-map.mmd) • [`feature-flags-map.drawio`](./feature-flags-map.drawio)
- **Folosire:** AIT-507/470 (control runtime fără redeploy), AIT-511 (corelări metrics vs flags)
- **Ce arată:** `quiz_adaptive_enabled`, `intent_conf_threshold`, `midcheck_sample_rate`, `baby_wording_enabled`, `quiz_copy_variant` și efectele lor în UI/flow.

---

## 12) Functions Overview (FE)

![Functions Overview](./functions-overview.png)

- **Fișiere:** [`functions-overview.mmd`](./functions-overview.mmd) • [`functions-overview.drawio`](./functions-overview.drawio)
- **Folosire:** AIT-470 (skeleton FE), AIT-511 (unde se emit evenimente)
- **Ce arată:** initApp, loadQuiz, runQuizLoop, inferIntent, askMidProgress, applyAdaptation, pickOutro, onCTAClick, captureEvent, parseUTM.

---

## 13) Diagrame funcționale detaliate (sursă .mmd)

> Acestea sunt **“low-level”** (la nivel de funcție/if/for). Randarea PNG o poți face în draw.io (Insert → Advanced → Mermaid).  
> Le folosim în code reviews și în task-urile FE/BE corespunzătoare.

- **GET /quiz — build payload din DB + flags**  
  Sursă: [`get-quiz-build-payload-from-DB-and-flags.mmd`](./get-quiz-build-payload-from-DB-and-flags.mmd)  
  **Tickets:** AIT-524/AIT-510 (BE integration), AIT-470 (FE load)  
  **Rol:** aglomerează `QUESTIONS`, `COPY_TEXT`, `REMOTE_CONFIG` într-un payload minim.

- **POST /quiz — validate & save**  
  Sursă: [`post-quiz-validate-save.mmd`](./post-quiz-validate-save.mmd)  
  **Tickets:** AIT-524/AIT-510  
  **Rol:** validează sesiunea și lungimea, inserează în `QUIZ_SESSIONS`/`QUIZ_ANSWERS`, marchează `completed_at`.

- **POST /lead — save & sync to provider**  
  Sursă: [`post-lead-save-sync.mmd`](./post-lead-save-sync.mmd)  
  **Tickets:** AIT-524/AIT-510, AIT-505 (campanii)  
  **Rol:** salvează email + consimțământ, trimite către Brevo/Mailchimp (dacă există cheie), returnează status de sync.

- **captureEvent() — minimal tracking (PostHog)**  
  Sursă: `captureEvent()–min-tracking-PostHog.mmd`  
  **Tickets:** AIT-511, AIT-506  
  **Rol:** whitelisting la evenimente (`quiz_intro_shown`, `quiz_start_clicked`, `quiz_complete`, `quiz_cta_clicked`), fără PII.

- **inferIntent — features & decizie**  
  Sursă: `inferIntent-features-decizion.mmd`  
  **Tickets:** AIT-470, AIT-504  
  **Rol:** scoruri Norman/Torres pe early signals, calculează `profile` + `confidence`.

- **pickOutro() — mapping**  
  Sursă: `pickOutr0()-mapping.mmd` *(nume exact din repo)*  
  **Tickets:** AIT-470  
  **Rol:** selectează `out_*_v1`, aplică baby wording dacă flag-ul e activat.

- **Control flow cu state machine (FE loop)**  
  Sursă: `control-flow-w-state-machine.mmd`  
  **Tickets:** AIT-470, AIT-469  
  **Rol:** for/if-uri din loop (Q1–Q6, MidCheck sampling, Adaptation cooldown, CTA debounce).

- **CSV loader — import content**  
  Sursă: [`csv-loader-import-content.mmd`](./csv-loader-import-content.mmd)  
  **Tickets:** Ops/Content (import inițial întrebări/copy)  
  **Rol:** importă `questions.csv` și `copy.csv` în `QUESTIONS` / `COPY_TEXT`.

---

## Cum editezi / regenerezi

- **Editare vizuală:** deschizi `.drawio` în app.diagrams.net.  
- **Editare ca “diagramă-ca-text”:** modifici `.mmd` și regenerezi PNG din draw.io (**Insert → Advanced → Mermaid** → Export PNG).  
- **Consistență:** ține denumirile evenimentelor/flag-urilor identice cu cele din `tracking.yaml` și `state_machine.md`.

---

## Legături cu backlog (scurt)

- **AIT-507** — folosește: context, component, deployment, feature-flags map  
- **AIT-470 / AIT-469** — folosește: component-detailed, state-machine, control-flow, inferIntent, pickOutro, functions-overview  
- **AIT-509** — folosește: ERD, RLS  
- **AIT-524 / AIT-510** — folosește: sequence, deployment, get-quiz-build-payload, post-quiz-validate-save, post-lead-save-sync  
- **AIT-511 / AIT-506** — folosește: data-flow, captureEvent, observability/incident-flow

---
