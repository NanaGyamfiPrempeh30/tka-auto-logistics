-- Public bucket: photos are vehicle/shipment progress shots, not sensitive.
-- Public read means the customer dashboard can render them with plain
-- <img src> public URLs, no signed-URL plumbing needed. Writes are
-- admin-only.

insert into storage.buckets (id, name, public)
values ('order-photos', 'order-photos', true)
on conflict (id) do nothing;

create policy "admin can upload order photos"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'order-photos' and public.is_admin());

create policy "admin can update order photos"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'order-photos' and public.is_admin())
  with check (bucket_id = 'order-photos' and public.is_admin());

create policy "admin can delete order photos"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'order-photos' and public.is_admin());

create policy "public can view order photos"
  on storage.objects
  for select
  to public
  using (bucket_id = 'order-photos');
