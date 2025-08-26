<p align="center">
  <img src="./lumlyn-logo-512.png" alt="Lumlyn Logo" width="200"/>
</p>

# Lumlyn — Pre-MVP Architecture

Acest folder conține **diagramele oficiale** pentru pre-MVP Lumlyn.  
Sunt menținute în trei formate:  
- **.mmd** — sursa în Mermaid (versionabilă)  
- **.drawio** — editabilă în diagrams.net  
- **.png** — export pentru vizualizare rapidă  

Scopul pre-MVP: quiz adaptiv mobil-first, colectare răspunsuri + email, tracking minim (PostHog), manual testing only.

---

## 1) C4 Context

![C4 Context](./c4-context.png)  
**Fișiere:** [`c4-context.mmd`](./c4-context.mmd) • [`c4-context.drawio`](./c4-context.drawio)

**Descriere:**  
Arată actorii principali și limitele de încredere: utilizator → aplicația web (Next.js) → CDN (Vercel Edge) → Supabase (Edge Functions + DB). Integrarea cu servicii externe: PostHog pentru analytics, provider de email pentru colectare lead-uri.  

**Procese reprezentate:**  
- User → Browser → CDN → FE App  
- FE App → Supabase Edge API → Postgres DB  
- Tracking minim → PostHog  
- Lead sync → Email provider  

**Tickete impactate:**  
- [FE] AIT-470 (FE prototype), AIT-469 (UI/UX flow)  
- [BE] AIT-524, AIT-510 (API endpoints), AIT-509 (DB setup)  
- [Analytics] AIT-511 (integrare evenimente minime), AIT-506 (dashboard funnel)  
- [OPS] AIT-507 (arhitectura pre-MVP)  

---

## 2) Component Diagram (High-Level)

![Component](./component-diagram.png)  
**Fișiere:** [`component-diagram.mmd`](./component-diagram.mmd) • [`component-diagram.drawio`](./component-diagram.drawio)

**Descriere:**  
Prezintă componentele majore și interacțiunile dintre ele. Frontend-ul Next.js servește quiz-ul, trimite răspunsurile către Edge Functions. Baza de date Supabase stochează sesiunile, răspunsurile și email-urile. Tracking-ul minim merge spre PostHog, iar email-urile se sincronizează cu providerul extern.  

**Procese reprezentate:**  
- FE UI (Intro, Questions, Outro, Email Capture)  
- BE API (GET /quiz, POST /quiz, POST /lead)  
- DB (Users, Sessions, Answers, Leads)  
- Analytics (PostHog minimal events)  
- Email sync  

**Tickete impactate:**  
- [FE] AIT-470 (FE flow, UI states), AIT-469 (UI/UX)  
- [BE] AIT-509 (DB schema), AIT-524, AIT-510 (API endpoints)  
- [Analytics] AIT-511 (event capture subset)  
- [OPS] AIT-507 (arhitectura generală)  

---

## 3) Component Diagram — Detailed

![Component Detailed](./component-detailed-diagram.png)  
**Fișiere:** [`component-detailed-diagram.mmd`](./component-detailed-diagram.mmd) • [`component-detailed-diagram.drawio`](./component-detailed-diagram.drawio)

**Descriere:**  
Detaliază fiecare bloc:  
- FE: funcții (`initApp`, `parseUTM`, `runQuizLoop`, `inferIntent`, `pickOutro`, `captureEvent`).  
- BE: API endpoints cu validări și inserții în DB.  
- DB: `QUESTIONS`, `COPY_TEXT`, `QUIZ_SESSIONS`, `QUIZ_ANSWERS`, `LEADS`, `REMOTE_CONFIG`.  
- Integrări: PostHog events whitelisted, Email API, Slack alerts pentru incidente.  
- Ops: CSV loader pentru import content, nightly export pentru ML (ops-only).  

**Procese reprezentate:**  
- Initialization → UTM tagging → Quiz loop → Intent inference → Adaptation → Outro → CTA.  
- API calls validate & save answers/leads.  
- Feature flags controlează flow-ul runtime.  
- Observability: PostHog funnel + Slack alerts.  

**Tickete impactate:**  
- [FE] AIT-470 (funcții quiz), AIT-469 (flow UI), AIT-505 (UTM tagging)  
- [BE] AIT-509 (schema completă), AIT-524, AIT-510 (API validate & save), AIT-505 (campanii)  
- [Analytics] AIT-511 (captureEvent), AIT-506 (funnel dashboards)  
- [OPS] AIT-507 (arhitectura), CSV import (ops ticket), export ML (ops ticket), runbook (incident handling)  

---
