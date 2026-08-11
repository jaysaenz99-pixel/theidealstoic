-- ─────────────────────────────────────────────────────────────────────────────
--  Run this once in the Supabase SQL Editor.
--  Dashboard → your project → SQL Editor → New query → paste → Run.
--  It is safe to run more than once.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  source      text,
  created_at  timestamptz not null default now()
);

-- Case-insensitive uniqueness. The site lowercases before inserting, so a
-- second signup with the same address is rejected here and reported to the
-- visitor as success.
create unique index if not exists subscribers_email_key
  on public.subscribers (lower(email));

-- ── Row Level Security ───────────────────────────────────────────────────────
-- The anon key is public by design; it ships in requests from the site. RLS is
-- what makes that safe. These policies allow the public to add an address and
-- nothing else — no reading the list, no editing it, no deleting from it.
--
-- You read the list from the Supabase dashboard, which uses your own login and
-- bypasses these policies.

alter table public.subscribers enable row level security;

drop policy if exists "anyone may subscribe" on public.subscribers;

create policy "anyone may subscribe"
  on public.subscribers
  for insert
  to anon
  with check (true);

-- Deliberately no select, update or delete policy for anon. Under RLS, absence
-- of a policy means the operation is denied.
