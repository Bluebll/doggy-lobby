-- =====================================================================
-- Doggy Lobby / Ecommerce Starter — Stock functions
-- Adds atomic stock decrement RPC.
-- =====================================================================

create or replace function public.decrement_stock(p_id uuid, p_qty int)
returns int
language plpgsql
security definer
as $$
declare
  new_stock int;
begin
  update public.products
     set stock = greatest(stock - p_qty, 0),
         updated_at = now()
   where id = p_id
  returning stock into new_stock;
  return coalesce(new_stock, 0);
end;
$$;

grant execute on function public.decrement_stock(uuid, int) to service_role;
