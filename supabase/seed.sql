-- =====================================================================
-- Doggy Lobby — Seed Data (realistic pet store catalog)
-- Safe to run multiple times: uses on conflict (slug) do nothing.
-- =====================================================================

-- ---------- Categories ----------
insert into public.categories (name, slug, description, image_url, sort_order) values
  ('Dog Food',   'dog-food',   'Premium kibble, wet food and treats for every life stage.', 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800', 1),
  ('Cat Food',   'cat-food',   'Nutritious meals and snacks your cat will actually finish.', 'https://images.unsplash.com/photo-1615486363973-f79d875780cf?w=800', 2),
  ('Toys',       'toys',       'Chew toys, feather wands and puzzle feeders for endless fun.', 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=800', 3),
  ('Accessories','accessories','Collars, leashes, beds and everything in between.',           'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800', 4),
  ('Grooming',   'grooming',   'Shampoos, brushes and grooming essentials.',                  'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=800', 5),
  ('Health',     'health',     'Vitamins, supplements and everyday wellness.',                'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800', 6)
on conflict (slug) do nothing;

-- ---------- Products ----------
with c as (
  select slug, id from public.categories
)
insert into public.products
  (category_id, name, slug, description, price, compare_at_price, stock, sku,
   images, attributes, is_featured, is_best_seller, is_on_offer)
values
  ((select id from c where slug='dog-food'),
   'Chicken & Rice Adult Dog Food 3kg', 'chicken-rice-adult-dog-food-3kg',
   'Balanced daily nutrition made with real chicken, wholesome grains and essential omega-3s.',
   1499.00, 1799.00, 40, 'DF-CR-3KG',
   array['https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800'],
   '{"brand":"PawPrime","weight":"3kg","life_stage":"adult"}'::jsonb,
   true, true, true),

  ((select id from c where slug='dog-food'),
   'Puppy Starter Kibble 1kg', 'puppy-starter-kibble-1kg',
   'Small bites, big nutrition — DHA-rich formula for growing puppies.',
   699.00, null, 60, 'DF-PP-1KG',
   array['https://images.unsplash.com/photo-1601758260908-9dd6c47ffbfe?w=800'],
   '{"brand":"PawPrime","weight":"1kg","life_stage":"puppy"}'::jsonb,
   true, false, false),

  ((select id from c where slug='cat-food'),
   'Ocean Fish Cat Food 2kg', 'ocean-fish-cat-food-2kg',
   'Grain-free recipe with tuna and salmon for a shiny coat.',
   1199.00, 1399.00, 35, 'CF-OF-2KG',
   array['https://images.unsplash.com/photo-1585499193969-84388a0d6da8?w=800'],
   '{"brand":"WhiskersCo","weight":"2kg","life_stage":"adult"}'::jsonb,
   true, true, true),

  ((select id from c where slug='cat-food'),
   'Kitten Milk Replacer 400g', 'kitten-milk-replacer-400g',
   'Complete milk formula for orphaned or nursing kittens under 8 weeks.',
   549.00, null, 25, 'CF-KM-400',
   array['https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800'],
   '{"brand":"WhiskersCo","weight":"400g","life_stage":"kitten"}'::jsonb,
   false, false, false),

  ((select id from c where slug='toys'),
   'Rope Tug Chew Toy', 'rope-tug-chew-toy',
   'Cotton rope tug — great for teething pups and dental health.',
   299.00, 399.00, 120, 'TY-RT-01',
   array['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800'],
   '{"material":"cotton","size":"medium"}'::jsonb,
   false, true, true),

  ((select id from c where slug='toys'),
   'Feather Wand Cat Teaser', 'feather-wand-cat-teaser',
   'Interactive feather wand to keep indoor cats active and entertained.',
   249.00, null, 80, 'TY-FW-01',
   array['https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800'],
   '{"material":"feather","size":"one-size"}'::jsonb,
   true, false, false),

  ((select id from c where slug='accessories'),
   'Adjustable Nylon Collar — Red', 'adjustable-nylon-collar-red',
   'Durable nylon collar with quick-release buckle, fits necks 30–45cm.',
   399.00, null, 90, 'AC-NC-RD',
   array['https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800'],
   '{"color":"red","size":"M"}'::jsonb,
   false, true, false),

  ((select id from c where slug='accessories'),
   'Cozy Fleece Pet Bed — Grey', 'cozy-fleece-pet-bed-grey',
   'Ultra-soft fleece bed with anti-slip base. Machine washable.',
   1899.00, 2299.00, 20, 'AC-PB-GR',
   array['https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=800'],
   '{"color":"grey","size":"L"}'::jsonb,
   true, true, true),

  ((select id from c where slug='grooming'),
   'Oatmeal Gentle Shampoo 500ml', 'oatmeal-gentle-shampoo-500ml',
   'Soothing oatmeal formula for sensitive skin. pH-balanced for pets.',
   449.00, null, 50, 'GR-SH-500',
   array['https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=800'],
   '{"volume":"500ml"}'::jsonb,
   false, false, false),

  ((select id from c where slug='grooming'),
   'Self-Cleaning Slicker Brush', 'self-cleaning-slicker-brush',
   'Retractable bristles remove tangles and loose fur in one press.',
   699.00, 899.00, 45, 'GR-BR-01',
   array['https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800'],
   '{"type":"slicker"}'::jsonb,
   true, false, true),

  ((select id from c where slug='health'),
   'Multivitamin Chews 60ct', 'multivitamin-chews-60ct',
   'Daily chewable multivitamin supporting immunity, skin and joints.',
   899.00, null, 30, 'HL-MV-60',
   array['https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800'],
   '{"count":60,"flavor":"chicken"}'::jsonb,
   false, true, false),

  ((select id from c where slug='health'),
   'Salmon Oil Omega-3 250ml', 'salmon-oil-omega-3-250ml',
   'Cold-pressed salmon oil for a shiny coat and healthy joints.',
   649.00, 799.00, 40, 'HL-SO-250',
   array['https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800'],
   '{"volume":"250ml"}'::jsonb,
   true, true, true)
on conflict (slug) do nothing;
