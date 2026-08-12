-- Enable RLS for all affected tables
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flash_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flash_sale_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotional_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featured_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.best_sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_of_day ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hot_deals_products ENABLE ROW LEVEL SECURITY;

-- Security Note:
-- public.orders and public.order_items intentionally have NO policies.
-- The application architecture exclusively accesses these tables via server-side
-- routes and admin pages using the Service Role Key, which bypasses RLS.
-- This guarantees customer data cannot be read or modified by the public API.

-- Add public read policies for catalog and marketing tables
CREATE POLICY "Allow public read access" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.flash_sales FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.flash_sale_products FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.promotional_banners FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.featured_collections FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.best_sellers FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.hero_banners FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.deal_of_day FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.hot_deals_products FOR SELECT USING (true);
