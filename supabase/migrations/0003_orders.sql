-- Phase 3: Order + OrderUpdate per PRD §5. lead_id is an addition beyond the
-- PRD's listed Order fields — needed so the admin "create order from a lead"
-- flow can carry vehicle-interest context forward without retyping it.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lead_id uuid references public.leads (id) on delete set null,
  vehicle_make text not null,
  vehicle_model text not null,
  vehicle_year text not null,
  auction_source text,
  vin text,
  stage text not null default 'auction'
    check (stage in ('auction', 'container', 'roro', 'towing', 'delivered')),
  deposit_amount numeric(12, 2) not null default 0,
  balance_amount numeric(12, 2) not null default 0,
  deposit_paid boolean not null default false,
  balance_paid boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists orders_stage_idx on public.orders (stage);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

alter table public.orders enable row level security;

-- Customers see only their own orders; admin sees all. No customer
-- insert/update/delete policies exist at all — only admin writes.
create policy "customers read own orders, admin reads all"
  on public.orders
  for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

create policy "admin can insert orders"
  on public.orders
  for insert
  to authenticated
  with check (public.is_admin());

create policy "admin can update orders"
  on public.orders
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create table if not exists public.order_updates (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  stage text not null
    check (stage in ('auction', 'container', 'roro', 'towing', 'delivered')),
  note text,
  photo_urls text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists order_updates_order_id_idx on public.order_updates (order_id);
create index if not exists order_updates_created_at_idx on public.order_updates (created_at desc);

alter table public.order_updates enable row level security;

create policy "customers read own order updates, admin reads all"
  on public.order_updates
  for select
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.orders o
      where o.id = order_updates.order_id and o.user_id = auth.uid()
    )
  );

create policy "admin can insert order updates"
  on public.order_updates
  for insert
  to authenticated
  with check (public.is_admin());
