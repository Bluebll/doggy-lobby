-- Production hardening for ecommerce orders.
-- Orders, order_items, and stock changes happen in one PostgreSQL transaction.

ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS idempotency_key text;

CREATE UNIQUE INDEX IF NOT EXISTS orders_order_number_uidx
ON public.orders(order_number);

CREATE UNIQUE INDEX IF NOT EXISTS orders_idempotency_key_uidx
ON public.orders(idempotency_key)
WHERE idempotency_key IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS products_slug_uidx
ON public.products(slug);

ALTER TABLE public.products
DROP CONSTRAINT IF EXISTS products_sale_price_check;

ALTER TABLE public.products
ADD CONSTRAINT products_sale_price_check
CHECK (
  sale_price IS NULL
  OR (sale_price >= 0 AND sale_price < price)
) NOT VALID;

ALTER TABLE public.products
DROP CONSTRAINT IF EXISTS products_price_check;

ALTER TABLE public.products
ADD CONSTRAINT products_price_check
CHECK (price >= 0) NOT VALID;

ALTER TABLE public.products
DROP CONSTRAINT IF EXISTS products_stock_check;

ALTER TABLE public.products
ADD CONSTRAINT products_stock_check
CHECK (stock >= 0) NOT VALID;

ALTER TABLE public.orders
DROP CONSTRAINT IF EXISTS orders_status_check;

ALTER TABLE public.orders
ADD CONSTRAINT orders_status_check
CHECK (
  status IN (
    'pending',
    'confirmed',
    'shipped',
    'delivered',
    'cancelled'
  )
) NOT VALID;


CREATE OR REPLACE FUNCTION public.create_order_atomic(
  p_customer_name text,
  p_customer_phone text,
  p_customer_address text,
  p_notes text,
  p_items jsonb,
  p_idempotency_key text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_order_id orders.id%TYPE;
  v_order_number text;
  v_product products%ROWTYPE;
  v_product_id bigint;
  v_quantity integer;
  v_price numeric(10,2);
  v_total numeric(12,2) := 0;
  v_existing orders%ROWTYPE;
  v_date text;
BEGIN

  -- Validate customer information.
  IF length(trim(coalesce(p_customer_name, ''))) < 2
     OR length(p_customer_name) > 100 THEN
    RAISE EXCEPTION 'Invalid customer name';
  END IF;

  IF length(trim(coalesce(p_customer_phone, ''))) < 7
     OR length(p_customer_phone) > 20 THEN
    RAISE EXCEPTION 'Invalid phone number';
  END IF;

  IF length(trim(coalesce(p_customer_address, ''))) < 5
     OR length(p_customer_address) > 500 THEN
    RAISE EXCEPTION 'Invalid delivery address';
  END IF;

  IF p_notes IS NOT NULL
     AND length(p_notes) > 500 THEN
    RAISE EXCEPTION 'Notes are too long';
  END IF;

  -- Every checkout request must have a stable idempotency key.
  IF p_idempotency_key IS NULL
     OR length(trim(p_idempotency_key)) < 16
     OR length(p_idempotency_key) > 200 THEN
    RAISE EXCEPTION 'Invalid idempotency key';
  END IF;

  -- Retry with the same key returns the existing order.
  SELECT *
  INTO v_existing
  FROM orders
  WHERE idempotency_key = p_idempotency_key
  LIMIT 1;

  IF FOUND THEN
    RETURN jsonb_build_object(
      'id', v_existing.id,
      'order_number', v_existing.order_number,
      'total_price', v_existing.total_price,
      'status', v_existing.status
    );
  END IF;

  -- Validate cart.
  IF jsonb_typeof(p_items) <> 'array'
     OR jsonb_array_length(p_items) = 0
     OR jsonb_array_length(p_items) > 50 THEN
    RAISE EXCEPTION 'Invalid cart';
  END IF;

  -- Human-facing order number uses India/IST date.
  v_date := to_char(
    now() AT TIME ZONE 'Asia/Kolkata',
    'YYYYMMDD'
  );

  v_order_number :=
    'DL-' ||
    v_date ||
    '-' ||
    upper(
      substr(
        md5(random()::text || clock_timestamp()::text),
        1,
        6
      )
    );

  -- Create the order.
  INSERT INTO orders (
    order_number,
    customer_name,
    customer_phone,
    customer_address,
    notes,
    total_price,
    status,
    idempotency_key
  )
  VALUES (
    v_order_number,
    trim(p_customer_name),
    trim(p_customer_phone),
    trim(p_customer_address),
    NULLIF(trim(coalesce(p_notes, '')), ''),
    0,
    'pending',
    trim(p_idempotency_key)
  )
  ON CONFLICT (idempotency_key)
  DO NOTHING
  RETURNING id INTO v_order_id;

  -- Another request may have won the race.
  IF v_order_id IS NULL THEN

    SELECT *
    INTO v_existing
    FROM orders
    WHERE idempotency_key = trim(p_idempotency_key)
    LIMIT 1;

    IF FOUND THEN
      RETURN jsonb_build_object(
        'id', v_existing.id,
        'order_number', v_existing.order_number,
        'total_price', v_existing.total_price,
        'status', v_existing.status
      );
    END IF;

    RAISE EXCEPTION 'Could not create order';
  END IF;


  -- Merge duplicate product IDs before processing.
  FOR v_product_id, v_quantity IN
    SELECT
      x.product_id,
      sum(x.quantity)::integer
    FROM jsonb_to_recordset(p_items)
      AS x(product_id bigint, quantity integer)
    GROUP BY x.product_id
  LOOP

    IF v_product_id IS NULL
       OR v_product_id <= 0
       OR v_quantity IS NULL
       OR v_quantity < 1
       OR v_quantity > 100 THEN
      RAISE EXCEPTION 'Invalid product or quantity';
    END IF;


    -- Lock the product row.
    -- This makes the stock check + decrement atomic.
    SELECT *
    INTO v_product
    FROM products
    WHERE id = v_product_id
      AND is_active = true
    FOR UPDATE;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Product % is unavailable', v_product_id;
    END IF;

    IF v_product.stock IS NULL
       OR v_product.stock < v_quantity THEN
      RAISE EXCEPTION
        'Not enough stock for %. Only % left.',
        v_product.name,
        coalesce(v_product.stock, 0);
    END IF;


    -- Always calculate price from the database.
    v_price := CASE
      WHEN v_product.sale_price IS NOT NULL
       AND v_product.sale_price >= 0
       AND v_product.sale_price < v_product.price
      THEN v_product.sale_price
      ELSE v_product.price
    END;


    v_total :=
      v_total +
      (v_price * v_quantity);


    INSERT INTO order_items (
      order_id,
      product_id,
      quantity,
      price
    )
    VALUES (
      v_order_id,
      v_product.id,
      v_quantity,
      v_price
    );


    UPDATE products
    SET stock = stock - v_quantity
    WHERE id = v_product.id;

  END LOOP;


  IF v_total <= 0 THEN
    RAISE EXCEPTION 'Order total must be greater than zero';
  END IF;


  UPDATE orders
  SET total_price = round(v_total, 2)
  WHERE id = v_order_id;


  RETURN jsonb_build_object(
    'id', v_order_id,
    'order_number', v_order_number,
    'total_price', round(v_total, 2),
    'status', 'pending'
  );

END;
$$;


-- Only the server-side service role may execute this function.
REVOKE ALL
ON FUNCTION public.create_order_atomic(
  text,
  text,
  text,
  text,
  jsonb,
  text
)
FROM PUBLIC;

GRANT EXECUTE
ON FUNCTION public.create_order_atomic(
  text,
  text,
  text,
  text,
  jsonb,
  text
)
TO service_role;