DROP TABLE IF EXISTS read_products CASCADE;

DROP TABLE IF EXISTS read_related_products CASCADE;

CREATE TABLE IF NOT EXISTS read_related_products (
 product_id BIGSERIAL,
 related_products jsonb
);

TRUNCATE read_products;
TRUNCATE read_related_products;

COPY read_related_products (product_id, related_products)
FROM '/Users/timothyloo/Desktop/Hack Reactor/TJ-Products-API/data/Rrelated_products.csv'
CSV HEADER;

ALTER TABLE read_related_products ADD CONSTRAINT read_related_products_pkey PRIMARY KEY (product_id);