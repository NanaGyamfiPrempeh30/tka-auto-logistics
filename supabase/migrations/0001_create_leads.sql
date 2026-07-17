create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  vehicle_interest text not null,
  ghana_city text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'converted')),
  created_at timestamptz not null default now()
);

create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- PRD §5: public quote form submits leads anonymously.
create policy "anyone can submit a lead"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- Single-admin model (PRD §10): any authenticated user is the admin —
-- there is no roles table, so "authenticated" is the full admin gate.
create policy "authenticated admin can read leads"
  on public.leads
  for select
  to authenticated
  using (true);

create policy "authenticated admin can update leads"
  on public.leads
  for update
  to authenticated
  using (true)
  with check (true);
