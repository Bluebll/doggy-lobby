# Supabase setup for this starter

## Run migrations (SQL editor, in this order)
1. `migrations/0001_init_schema.sql` — tables, indexes, RLS, triggers, order-number sequence
2. `migrations/0002_stock_functions.sql` — atomic `decrement_stock()` RPC
3. `storage/buckets.sql` — `product-images`, `category-images` buckets + public read policies
4. `seed.sql` (optional) — 6 sample categories + 12 realistic products

## Bootstrap the first admin user
After you create a user in **Authentication → Users** (or the user signs up via `/admin/login` if you enable signups), promote them to admin by running:

```sql
update auth.users
   set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object('role','admin')
 where email = 'YOUR_EMAIL@example.com';
```

The app checks `user_metadata.role === 'admin'` via the `is_admin()` SQL helper and the `isAdminRequest()` server helper. RLS policies + `/api/admin/*` guards are already enforced.

## Rotate an admin back to a regular customer
```sql
update auth.users
   set raw_user_meta_data = raw_user_meta_data - 'role'
 where email = 'YOUR_EMAIL@example.com';
```

## Storage upload rules
- `/api/admin/upload` accepts `image/*` only
- Max 5 MB per file
- Buckets: `product-images` (multi) and `category-images` (single)
