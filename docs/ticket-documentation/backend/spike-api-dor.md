\# \[BE]\[Spike] DoR — Integrare API cu frontend (save quiz answers, save email)



\## 0) Scop \& impact pe metrici

\- Expunem salvarea \*\*răspunsurilor de quiz\*\* și \*\*email-urilor (leads)\*\* prin \*\*Supabase REST\*\* (PostgREST).

\- Ținte: 

&nbsp; - TTV (intro→tip\_open) p95 ≤ 80s

&nbsp; - feedback\_latency\_p95 ≤ 1500ms (request→response)

&nbsp; - total\_quiz\_p95 ≤ 80s

&nbsp; - Activation% ≥ 60%

&nbsp; - tap\_error\_rate < 1%



\## 1) Endpoint-uri (Supabase REST / PostgREST)

> Notă: folosim \*\*instanța Supabase\*\* existentă; RLS rămâne ON. Clientul apelează REST cu \*\*anon key\*\* + RLS policies care permit doar inserturile permise.



\### 1.1 Quiz Responses

\- \*\*URL:\*\* `/rest/v1/quiz\_responses`

\- \*\*METHOD:\*\* `POST`

\- \*\*HEADERS:\*\*

&nbsp; - `apikey: <SUPABASE\_ANON\_KEY>`

&nbsp; - `Authorization: Bearer <SUPABASE\_ANON\_KEY>`

&nbsp; - `Content-Type: application/json`

&nbsp; - `Prefer: return=representation`

\- \*\*PAYLOAD (JSON):\*\*

&nbsp; ```json

&nbsp; {

&nbsp;   "request\_id": "<uuid-v4>",          // idempotency key (unic)

&nbsp;   "user\_id": "<uuid|null>",           // dacă e logat; altfel null

&nbsp;   "session\_id": "<string>",           // FE session/token scurt (ex: nanoid)

&nbsp;   "quiz\_version": "<string>",         // ex: "v1"

&nbsp;   "answers": { "...": "..." },        // JSONB: structurat conform \[TRACK]

&nbsp;   "device": "<mobile|desktop|tablet>",

&nbsp;   "ts\_client": "<iso8601>"

&nbsp; }

```

VALIDĂRI (runtime + DB):



request\_id obligatoriu, uuid valid



answers JSON non-empty



session\_id non-empty



UNIQUE (request\_id) — previne duplicatele



RĂSPUNS 201:



Body: rândul inserat (include id, created\_at).



1.2 Leads (Email)



URL: /rest/v1/leads



METHOD: POST



HEADERS: ca mai sus



PAYLOAD (JSON):

  ```json

{

&nbsp; "request\_id": "<uuid-v4>",

&nbsp; "email": "name@example.com",

&nbsp; "source": "quiz\_outro|landing|...",

&nbsp; "consent": true,

&nbsp; "session\_id": "<string>",

&nbsp; "ts\_client": "<iso8601>"

}

```

VALIDĂRI:



request\_id obligatoriu (uuid)



email format valid



consent === true pentru a salva



UNIQUE (request\_id) și UNIQUE NULLS DISTINCT pe (email, source, session\_id) opțional (anti-spam soft)



RĂSPUNS 201: rândul inserat.



2\) Auth \& RLS



Auth client: anon (public) — doar INSERT permis prin policies explicite, fără SELECT la date sensibile.



RLS policies minime:



quiz\_responses: INSERT permis tuturor doar dacă request\_id este uuid valid și answers non-empty.



leads: INSERT permis tuturor doar dacă consent = true și email valid (regex în check constraint) — select/udpate/ delete blocate.



PII: stocăm doar email în leads (conform \[SCOPE]); fără PII în quiz\_responses.



3\) Rate-limit \& abuz



Client middleware (Next.js): limiter pe IP + session\_id (Redis/Upstash sau edge-config) pentru POST /leads: max 3/min.



DB-level: UNIQUE (request\_id) pe ambele tabele. Opțional: UNIQUE (email, source, session\_id) pentru leads cu deferrable initially immediate și policy on conflict do nothing (via Prefer header: resolution=ignore-duplicates dacă folosim upsert).



4\) Idempotency



Protocol: FE generează request\_id = uuidv4() la fiecare încercare de submit; retry reutilizează același request\_id.



DB: UNIQUE (request\_id) + INSERT ... ON CONFLICT DO NOTHING (expus de PostgREST prin Prefer: resolution=ignore-duplicates când facem UPSERT pe view/materialized view/PK?). Alternativ, endpoint simplu POST + tratăm 409 ca succes (duplicate).



5\) Contractele payload (sketch)



Se aliniază cu tracking.yaml (\[TRACK]) — câmpuri obligatorii:



quiz\_responses: request\_id\*, session\_id\*, quiz\_version\*, answers\*, device\*, ts\_client\*, user\_id?



leads: request\_id\*, email\*, source\*, consent\*, session\_id\*, ts\_client\*



6\) Test plan (mock)

6.1 cURL — Quiz

``` bash

curl -X POST "$SUPABASE\_URL/rest/v1/quiz\_responses" \\

&nbsp; -H "apikey: $SUPABASE\_ANON\_KEY" \\

&nbsp; -H "Authorization: Bearer $SUPABASE\_ANON\_KEY" \\

&nbsp; -H "Content-Type: application/json" \\

&nbsp; -H "Prefer: return=representation" \\

&nbsp; -d '{

&nbsp;   "request\_id":"8f6c7f62-9e2c-4f2b-9d9c-7a6b2e1c1234",

&nbsp;   "session\_id":"s\_abc123",

&nbsp;   "quiz\_version":"v1",

&nbsp;   "answers":{"q1":"a","q2":"b"},

&nbsp;   "device":"desktop",

&nbsp;   "ts\_client":"2025-09-11T10:00:00.000Z"

&nbsp; }'

```

6.2 cURL — Lead

``` bash

curl -X POST "$SUPABASE\_URL/rest/v1/leads" \\

&nbsp; -H "apikey: $SUPABASE\_ANON\_KEY" \\

&nbsp; -H "Authorization: Bearer $SUPABASE\_ANON\_KEY" \\

&nbsp; -H "Content-Type: application/json" \\

&nbsp; -H "Prefer: return=representation" \\

&nbsp; -d '{

&nbsp;   "request\_id":"a3c6d0b3-5fbe-4c36-8b74-2f0272b4b321",

&nbsp;   "email":"name@example.com",

&nbsp;   "source":"quiz\_outro",

&nbsp;   "consent":true,

&nbsp;   "session\_id":"s\_abc123",

&nbsp;   "ts\_client":"2025-09-11T10:00:00.000Z"

&nbsp; }'

```

6.3 HTTPie — Idempotency retry (Lead duplicate)

``` bash

http POST $SUPABASE\_URL/rest/v1/leads \\

&nbsp; apikey:$SUPABASE\_ANON\_KEY Authorization:"Bearer $SUPABASE\_ANON\_KEY" \\

&nbsp; Prefer:"return=representation" \\

&nbsp; request\_id=a3c6d0b3-5fbe-4c36-8b74-2f0272b4b321 \\

&nbsp; email=name@example.com source=quiz\_outro consent:=true session\_id=s\_abc123 ts\_client=2025-09-11T10:00:00.000Z

```

Așteptat: 201 la prima execuție; la retry posibil 409/201 identical (în funcție de setup). FE tratează drept succes.

7\) Tracking (PostHog) — evenimente \& mapping \[TRACK]



quiz\_submit\_attempted (before request) {quiz\_version, session\_id}



quiz\_submit\_succeeded / quiz\_submit\_failed {status, request\_id, duration\_ms, error\_code?}



lead\_submit\_attempted



lead\_submit\_succeeded / lead\_submit\_failed



Sampling: full pentru aceste evenimente (critice pentru Activation%).



Corelare: request\_id devine distinct-id secundar pentru debugging backend↔frontend.



8\) Feature flags \& rollout



Flag: api.save\_quiz.enabled, api.save\_lead.enabled (default OFF → beta cohort → 100%)



Fallback:



Quiz: dacă OFF/eroare, salvează în localStorage și re-trimite pe ecranul următor.



Lead: dezactivează CTA și afișează mesaj „Înscrierile sunt temporar oprite”.



Rollback instant: set flags OFF (idempotent, fără migrare).



9\) Acceptanță (E2E)



S1 (Happy path quiz save): Submit → 201; evenimente PostHog quiz\_submit\_\* corecte; intrare în DB vizibilă.



S2 (Lead save): Submit → 201; lead\_submit\_\* corecte; intrare în DB vizibilă.



S8 (Retry/idempotency): dublu submit cu același request\_id → fără duplicate în DB; FE afișează success.



p95 latency ≤ 1500ms pentru ambele.



10\) DB \& RLS (verificări)



quiz\_responses(request\_id uuid UNIQUE NOT NULL, answers jsonb NOT NULL, session\_id text NOT NULL, quiz\_version text NOT NULL, device text NOT NULL, ts\_client timestamptz NOT NULL, user\_id uuid NULL, created\_at timestamptz DEFAULT now())



leads(request\_id uuid UNIQUE NOT NULL, email citext NOT NULL, source text NOT NULL, consent boolean NOT NULL, session\_id text NOT NULL, ts\_client timestamptz NOT NULL, created\_at timestamptz DEFAULT now())



CHECKs:



email ~\* '^\[A-Z0-9.\_%+-]+@\[A-Z0-9.-]+\\\\.\[A-Z]{2,}$'



Policies (pseudo):



quiz\_responses\_ins: for insert using (true) with check (request\_id IS NOT NULL AND jsonb\_typeof(answers) = 'object')



leads\_ins: for insert using (true) with check (consent = true AND email ~\* ...)



11\) Operare \& observabilitate



Logăm status code și durată (FE).



Alertă ușoară: dacă lead\_submit\_failed rate > 2% / 5 min → Slack.



Dashboards: % succes submit, p95 durată, duplicate rate.



12\) Plan execuție (ordine)



Confirmă UNIQUE (request\_id) + CHECK email + RLS policies (DB migration).



Activează flags (default OFF).



Implementează FE service + tests mock (cURL/HTTPie).



Wire PostHog events.



Rollout pe cohortă (10% → 50% → 100%).



Semnează E2E S1/S2/S8.



13\) Riscuri \& mitigări



Spam leads: rate-limit + unique composites → 409 tratat ca success.



RLS prea strict: testăm cu cURL înainte de FE rollout.



Latency > p95: payload mic, no joins, return=minimal pentru FE dacă nu e nevoie de reprezentare.







