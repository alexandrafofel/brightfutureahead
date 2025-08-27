# Lumlyn — Setup (FREE) — Supabase + PostHog

## Ce este

- **Supabase** = Postgres + Auth + Storage (Free, alternativă open-source la Firebase).
- **PostHog** = product analytics + events + feature flags (Free tier).

## Pași făcuți

1. Next.js creat în `apps/lumlyn-web` (TypeScript, App Router, Tailwind).
2. PostHog integrat în `app/providers.tsx` → trimite automat event `app_loaded`.
3. Supabase client configurat în `lib/supabaseClient.ts`.
4. Tabel `profiles` creat cu RLS activat (ON).
5. Endpoint smoke test `/api/ping` → răspunde cu `{ ok: true }`.

## Variabile `.env.local`

NEXT_PUBLIC_SUPABASE_URL=<Project URL din Supabase>

NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>

NEXT_PUBLIC_POSTHOG_KEY=<phc_... din Project settings PostHog>

NEXT_PUBLIC_POSTHOG_HOST=<[https://us.posthog.com](https://us.posthog.com/) sau https://eu.i.posthog.com>

## Comenzi

npm install

npm run dev

## Verificări

- PostHog → **Events**: evenimentul `app_loaded` vizibil după deschiderea localhost.
- `http://localhost:3000/api/ping` → `{ ok: true, error: null }`.

## Acces echipă

- **Supabase** → Organization → Members → Invite
    - Admin: `alexandrafofel@gmail.com`
    - Developer: `biancamoraru99@yahoo.com`
- **PostHog** → Project → Invite
    - Admin: `alexandrafofel@gmail.com`
    - Member: `biancamoraru99@yahoo.com`

## Securitate (FREE)

- Nu comite `.env.local` în Git.
- Folosește doar `anon public key` în client (browser).
- `service_role key` se folosește doar pe server.
- Limitează event names (snake/kebab-case), nu loga date sensibile (PII).