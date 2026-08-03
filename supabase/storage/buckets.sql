-- =====================================================================
-- Doggy Lobby — Storage Buckets
-- Run in Supabase SQL editor after 0001_init_schema.sql.
-- =====================================================================

-- Create buckets (public read). Writes go through service_role from the server.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = excluded.public;

insert into storage.buckets (id, name, public)
values ('category-images', 'category-images', true)
on conflict (id) do update set public = excluded.public;

-- Public read policies (objects table). Service-role bypasses RLS for writes.
drop policy if exists "public read product-images" on storage.objects;
create policy "public read product-images"
  on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists "public read category-images" on storage.objects;
create policy "public read category-images"
  on storage.objects for select
  using (bucket_id = 'category-images');
