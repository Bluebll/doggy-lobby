-- =====================================================================
-- Doggy Lobby — Initial Schema (Phase 0)
-- Idempotent: safe to re-run.
-- =====================================================================

-- ---------- Extensions ----------
create extension if not exists "pgcrypto";  -- gen_random_uuid()

-- ---------- Helper: updated_at trigger ----------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- Human-readable order numbers (DL-YYYY-000001) ----------
create sequence if not exists public.order_number_seq start 1;

create or replace function public.generate_order_number()
returns text
language plpgsql
as $$
declare
  n bigint;
begin
  n := nextval('public.order_number_seq');
  return 'DL-' || to_char(now(), 'YYYY') || '-' || lpad(n::text, 6, '0');
end;
$$;

-- =====================================================================
-- categories
-- =====================================================================
create table if not exists public.categories (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  slug         text not null unique,
  description  text,
  image_url    text,
  sort_order   int  not null default 0,
  is_active    bool not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists categories_active_sort_idx
  on public.categories (is_active, sort_order);

drop trigger if exists trg_categories_updated_at on public.categories;
create trigger trg_categories_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

-- =====================================================================
-- products
-- =====================================================================
create table if not exists public.products (
  id                uuid primary key default gen_random_uuid(),
  category_id       uuid references public.categories(id) on delete restrict,
  name              text not null,
  slug              text not null unique,
  description       text,
  price             numeric(10,2) not null check (price >= 0),
  compare_at_price  numeric(10,2) check (compare_at_price is null or compare_at_price >= 0),
  stock             int  not null default 0 check (stock >= 0),
  sku               text unique,
  images            text[] not null default '{}',
  attributes        jsonb  not null default '{}'::jsonb,
  is_featured       bool   not null default false,
  is_best_seller    bool   not null default false,
  is_on_offer       bool   not null default false,
  is_active         bool   not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists products_category_idx     on public.products (category_id);
create index if not exists products_active_idx       on public.products (is_active);
create index if not exists products_featured_idx     on public.products (is_featured)   where is_featured;
create index if not exists products_best_seller_idx  on public.products (is_best_seller) where is_best_seller;
create index if not exists products_offer_idx        on public.products (is_on_offer)    where is_on_offer;
create index if not exists products_name_search_idx  on public.products using gin (to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(description,'')));
create index if not exists products_attrs_idx        on public.products using gin (attributes);

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- =====================================================================
-- orders
-- =====================================================================
create table if not exists public.orders (
  id                uuid primary key default gen_random_uuid(),
  order_number      text not null unique default public.generate_order_number(),
  customer_name     text not null,
  customer_phone    text not null,
  customer_address  text not null,
  notes             text,
  items             jsonb not null,          -- snapshot: [{product_id,name,price,qty,image}]
  subtotal          numeric(10,2) not null check (subtotal >= 0),
  total             numeric(10,2) not null check (total >= 0),
  status            text not null default 'pending'
                    check (status in ('pending','confirmed','delivered','cancelled')),
  whatsapp_sent     bool not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists orders_status_idx      on public.orders (status);
create index if not exists orders_created_at_idx  on public.orders (created_at desc);

drop trigger if exists trg_orders_updated_at on public.orders;
create trigger trg_orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- =====================================================================
-- Row Level Security
-- =====================================================================
alter table public.categories enable row level security;
alter table public.products   enable row level security;
alter table public.orders     enable row level security;

-- Helper: is_admin() based on auth.jwt() user_metadata.role = 'admin'
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin',
    false
  );
$$;

-- ---------- categories policies ----------
drop policy if exists "categories public read" on public.categories;
create policy "categories public read"
  on public.categories for select
  using (is_active = true or public.is_admin());

drop policy if exists "categories admin write" on public.categories;
create policy "categories admin write"
  on public.categories for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------- products policies ----------
drop policy if exists "products public read" on public.products;
create policy "products public read"
  on public.products for select
  using (is_active = true or public.is_admin());

drop policy if exists "products admin write" on public.products;
create policy "products admin write"
  on public.products for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------- orders policies ----------
-- No public SELECT (admin only). Inserts happen server-side via service_role,
-- which bypasses RLS. No public policy needed for INSERT in MVP.
drop policy if exists "orders admin read" on public.orders;
create policy "orders admin read"
  on public.orders for select
  using (public.is_admin());

drop policy if exists "orders admin update" on public.orders;
create policy "orders admin update"
  on public.orders for update
  using (public.is_admin())
  with check (public.is_admin());
