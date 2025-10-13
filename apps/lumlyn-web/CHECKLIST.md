\# Lumlyn — Setup Checklist (FREE)



\## Supabase

\- \[ ] Cont creat pe plan Free (fără card).

\- \[ ] Organization `Lumlyn` și Project `Lumlyn Dev` create.

\- \[ ] Chei copiate (`PROJECT\_URL`, `ANON\_PUBLIC\_KEY`).

\- \[ ] Tabel `profiles` creat cu RLS ON.

\- \[ ] Test `/api/ping` → `{ ok: true }`.



\## PostHog

\- \[ ] Cont creat pe plan Free (fără card).

\- \[ ] Project `Lumlyn Dev` creat.

\- \[ ] Cheie `Project API Key` și `Host` copiate.

\- \[ ] Event `app\_loaded` apare în Events.



\## Next.js App

\- \[ ] Repo creat în `apps/lumlyn-web`.

\- \[ ] SDK-uri instalate (`@supabase/supabase-js`, `posthog-js`).

\- \[ ] `.env.local` configurat corect.

\- \[ ] `supabaseClient.ts` creat.

\- \[ ] `providers.tsx` conectat în `layout.tsx`.



\## Team Access

\- \[ ] Supabase: Alexandra (Admin), Bianca (Developer) invitate.

\- \[ ] PostHog: Alexandra (Admin), Bianca (Member) invitate.



\## Securitate

\- \[ ] `.env.local` este în `.gitignore`.

\- \[ ] Doar `anon public key` expus în client.

\- \[ ] Event names fără PII.



