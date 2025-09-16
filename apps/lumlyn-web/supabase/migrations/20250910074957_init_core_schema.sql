-- Extensions (idempotent)
create extension if not exists "pgcrypto";
create extension if not exists "citext";

-- USERS: shadow peste auth.users (PK = auth.users.id)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email citext not null unique,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint users_email_has_at check (position('@' in email) > 1)
);

-- QUIZ_RESPONSES: răspunsuri la chestionar
create table if not exists public.quiz_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  session_id text not null,
  quiz_version text not null,
  answers jsonb not null,
  total_time_ms integer check (total_time_ms >= 0),
  created_at timestamptz not null default now()
);

create index if not exists idx_quiz_responses_answers_gin
  on public.quiz_responses using gin (answers);

-- LEADS: captură email pentru onboarding/follow-up
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email citext not null,
  user_id uuid references public.users(id) on delete set null,
  source text,
  consent boolean not null default false,
  created_at timestamptz not null default now(),
  unique (email)
);

-- Timestamps auto-update
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_users_updated_at on public.users;
create trigger trg_users_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();
