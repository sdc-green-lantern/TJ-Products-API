-- CREATE TABLES

DROP TABLE IF EXISTS r_products CASCADE;

CREATE TABLE IF NOT EXISTS r_products (
 id BIGSERIAL,
 name VARCHAR(100) NOT NULL,
 slogan VARCHAR(255),
 description VARCHAR(1000),
 category VARCHAR(100) NOT NULL,
 default_price DECIMAL NOT NULL,
 features jsonb,
 created_at TIMESTAMP NOT NULL DEFAULT NOW(),
 updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE r_products ADD CONSTRAINT r_products_pkey PRIMARY KEY (id);

DROP TABLE IF EXISTS r_styles CASCADE;

CREATE TABLE IF NOT EXISTS r_styles (
 product_id BIGSERIAL,
 styles jsonb
);

ALTER TABLE r_styles ADD CONSTRAINT r_styles_pkey PRIMARY KEY (product_id);

DROP TABLE IF EXISTS r_photos CASCADE;

CREATE TABLE IF NOT EXISTS r_photos (
 style_id BIGSERIAL,
 photos jsonb
);

ALTER TABLE r_photos ADD CONSTRAINT r_photos_pkey PRIMARY KEY (style_id);

DROP TABLE IF EXISTS r_skus CASCADE;

CREATE TABLE IF NOT EXISTS r_skus (
 style_id BIGSERIAL,
 skus jsonb
);

ALTER TABLE r_skus ADD CONSTRAINT r_skus_pkey PRIMARY KEY (style_id);

DROP TABLE IF EXISTS r_related_products CASCADE;

CREATE TABLE IF NOT EXISTS r_related_products (
 product_id BIGSERIAL,
 related_products jsonb
);

ALTER TABLE r_related_products ADD CONSTRAINT r_related_products_pkey PRIMARY KEY (product_id);

-- LOAD TABLES

TRUNCATE r_products;

COPY r_products (id, name, slogan, description, category, default_price, features)
FROM '/Users/timothyloo/Desktop/Hack Reactor/TJ-Products-API/data/Rfeatures.csv'
DELIMITER ','
QUOTE '~'
CSV HEADER;

TRUNCATE r_photos;

COPY r_photos (style_id, photos)
FROM '/Users/timothyloo/Desktop/Hack Reactor/TJ-Products-API/data/Rphotos.csv'
DELIMITER ','
QUOTE '~'
CSV HEADER;

TRUNCATE r_skus;

COPY r_skus (style_id, skus)
FROM '/Users/timothyloo/Desktop/Hack Reactor/TJ-Products-API/data/Rskus.csv'
DELIMITER ','
QUOTE '~'
CSV HEADER;

TRUNCATE r_styles;

COPY r_styles (product_id, styles)
FROM '/Users/timothyloo/Desktop/Hack Reactor/TJ-Products-API/data/Rstyles.csv'
DELIMITER ','
QUOTE '~'
CSV HEADER;

TRUNCATE r_related_products;

COPY r_related_products (product_id, related_products)
FROM '/Users/timothyloo/Desktop/Hack Reactor/TJ-Products-API/data/Rrelated_products.csv'
DELIMITER ','
CSV HEADER;

DROP INDEX IF EXISTS r_products_idx;
DROP INDEX IF EXISTS r_photos_idx;
DROP INDEX IF EXISTS r_skus_idx;
DROP INDEX IF EXISTS r_styles_idx;
DROP INDEX IF EXISTS r_related_products_idx;

CREATE INDEX r_products_idx
ON r_products (id);

CREATE INDEX r_photos_idx
ON r_photos (style_id);

CREATE INDEX r_skus_idx
ON r_skus (style_id);

CREATE INDEX r_styles_idx
ON r_styles (product_id);

CREATE INDEX r_related_products_idx
ON r_related_products (product_id);