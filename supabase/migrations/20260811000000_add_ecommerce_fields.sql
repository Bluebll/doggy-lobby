ALTER TABLE products
ADD COLUMN sale_price numeric(10, 2) DEFAULT NULL,
ADD COLUMN structured_info jsonb DEFAULT NULL;
