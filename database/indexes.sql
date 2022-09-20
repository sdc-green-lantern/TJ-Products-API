DROP INDEX IF EXISTS products_idx;
DROP INDEX IF EXISTS features_idx;
DROP INDEX IF EXISTS styles_idx;
DROP INDEX IF EXISTS photos_idx;
DROP INDEX IF EXISTS categories_idx;
DROP INDEX IF EXISTS products_features_idx;
DROP INDEX IF EXISTS skus_idx;
DROP INDEX IF EXISTS related_products_idx;

CREATE INDEX products_idx
ON products (id, name, slogan, description, default_price,created_at, updated_at, category_id);

CREATE INDEX features_idx
ON features (id, feature, value);

CREATE INDEX styles_idx
ON styles (id, name, sale_price, default_sty, product_id);

CREATE INDEX photos_idx
ON photos (id, url, thumbnail_url, style_id);

CREATE INDEX categories_idx
ON categories (id, name);

CREATE INDEX products_features_idx
ON products_features (id, product_id, feature_id);

CREATE INDEX skus_idx
ON skus (sku, quantity, size, style_id);

CREATE INDEX related_products_idx
ON related_products (id, product_id, related_product_id);

--READ TABLES

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
