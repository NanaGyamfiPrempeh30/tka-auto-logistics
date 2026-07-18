-- Phase 3: customer accounts break the Phase 2 assumption that
-- "authenticated = admin" (leads policies used `to authenticated using (true)`).
-- Introduce an explicit role so customers can't read the leads inbox or
-- reach /admin once they can self-register.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "users can read own profile"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid());

-- Fires on every new Supabase Auth signup (customer self-serve registration).
-- security definer so it can write to profiles regardless of the RLS
-- policies above, which only allow a user to read/write their own row.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- One-time backfill: at the time this migration runs, the only Supabase Auth
-- user should be the single pre-created admin account from Phase 2 (customer
-- signup did not exist before this migration). This marks that account admin;
-- it is safe only because no customers have registered yet.
insert into public.profiles (id, email, role)
select id, email, 'admin' from auth.users
on conflict (id) do update set role = 'admin';

-- Helper for RLS policies. security definer + stable so it can be used
-- freely inside USING/WITH CHECK clauses without recursive RLS evaluation.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- Now that is_admin() exists, let admins look up any customer's profile
-- (needed to attach a new order to a customer by email).
create policy "admin can read all profiles"
  on public.profiles
  for select
  to authenticated
  using (public.is_admin());

-- Tighten the Phase 2 leads policies: previously any authenticated user
-- (using (true)) could read/update leads. Now that customers are also
-- authenticated users, restrict to admins only.
drop policy if exists "authenticated admin can read leads" on public.leads;
create policy "authenticated admin can read leads"
  on public.leads
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "authenticated admin can update leads" on public.leads;
create policy "authenticated admin can update leads"
  on public.leads
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());
