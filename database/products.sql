-- DROP DATABASE IF EXISTS sdc;

-- CREATE DATABASE sdc;

DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE IF NOT EXISTS products (
 id BIGSERIAL,
 name VARCHAR(100) NOT NULL,
 slogan VARCHAR(255),
 description VARCHAR(1000),
 default_price DECIMAL NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT NOW(),
 updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
 category_id INTEGER NOT NULL
);


ALTER TABLE products ADD CONSTRAINT products_pkey PRIMARY KEY (id);

DROP TABLE IF EXISTS features CASCADE;

CREATE TABLE IF NOT EXISTS features (
 id BIGSERIAL,
 feature VARCHAR(100) NOT NULL,
 value VARCHAR(100) NOT NULL
);


ALTER TABLE features ADD CONSTRAINT features_pkey PRIMARY KEY (id);

DROP TABLE IF EXISTS styles CASCADE;

CREATE TABLE IF NOT EXISTS styles (
 id BIGSERIAL,
 name VARCHAR(100) NOT NULL,
 sale_price DECIMAL DEFAULT NULL,
 default_sty BOOLEAN NOT NULL DEFAULT false,
 product_id INTEGER NOT NULL
);


ALTER TABLE styles ADD CONSTRAINT styles_pkey PRIMARY KEY (id);

DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE IF NOT EXISTS photos (
 id BIGSERIAL,
 url VARCHAR(400) NOT NULL,
 thumbnail_url VARCHAR(400),
 style_id INTEGER NOT NULL
);


ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);

DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE IF NOT EXISTS categories (
 id BIGSERIAL,
 name VARCHAR(100) NOT NULL
);


ALTER TABLE categories ADD CONSTRAINT categories_pkey PRIMARY KEY (id);

DROP TABLE IF EXISTS products_features CASCADE;

CREATE TABLE IF NOT EXISTS products_features (
 id BIGSERIAL,
 product_id INTEGER NOT NULL,
 feature_id INTEGER NOT NULL
);


ALTER TABLE products_features ADD CONSTRAINT products_features_pkey PRIMARY KEY (id);

DROP TABLE IF EXISTS skus CASCADE;

CREATE TABLE IF NOT EXISTS skus (
 sku INTEGER NOT NULL,
 quantity INTEGER NOT NULL DEFAULT 0,
 size VARCHAR(25) NOT NULL,
 style_id INTEGER
);


ALTER TABLE skus ADD CONSTRAINT skus_pkey PRIMARY KEY (sku);

DROP TABLE IF EXISTS related_products CASCADE;

CREATE TABLE IF NOT EXISTS related_products (
 id BIGSERIAL,
 product_id INTEGER NOT NULL,
 related_product_id INTEGER NOT NULL
);


ALTER TABLE related_products ADD CONSTRAINT related_products_pkey PRIMARY KEY (id);

DROP TABLE IF EXISTS cart CASCADE;

CREATE TABLE IF NOT EXISTS cart (
 cookie_id VARCHAR(255) NOT NULL,
 products jsonb
);


ALTER TABLE cart ADD CONSTRAINT cart_pkey PRIMARY KEY (cookie_id);

ALTER TABLE products ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id);
ALTER TABLE styles ADD CONSTRAINT styles_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE photos ADD CONSTRAINT photos_style_id_fkey FOREIGN KEY (style_id) REFERENCES styles(id);
ALTER TABLE products_features ADD CONSTRAINT products_features_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE products_features ADD CONSTRAINT products_features_feature_id_fkey FOREIGN KEY (feature_id) REFERENCES features(id);
ALTER TABLE skus ADD CONSTRAINT skus_style_id_fkey FOREIGN KEY (style_id) REFERENCES styles(id);
ALTER TABLE related_products ADD CONSTRAINT related_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE related_products ADD CONSTRAINT related_products_related_product_id_fkey FOREIGN KEY (related_product_id) REFERENCES products(id);