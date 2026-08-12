REVOKE EXECUTE ON FUNCTION public.create_order_atomic(
  text,
  text,
  text,
  text,
  jsonb,
  text
) FROM PUBLIC;

REVOKE EXECUTE ON FUNCTION public.create_order_atomic(
  text,
  text,
  text,
  text,
  jsonb,
  text
) FROM anon;

REVOKE EXECUTE ON FUNCTION public.create_order_atomic(
  text,
  text,
  text,
  text,
  jsonb,
  text
) FROM authenticated;

GRANT EXECUTE ON FUNCTION public.create_order_atomic(
  text,
  text,
  text,
  text,
  jsonb,
  text
) TO service_role;
