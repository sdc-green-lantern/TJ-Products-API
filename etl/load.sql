TRUNCATE categories CASCADE;

COPY categories (id, name)
FROM '/Users/timothyloo/Desktop/Hack Reactor/TJ-Products-API/data/etlCategories.csv'
DELIMITER ','
CSV HEADER;

TRUNCATE products CASCADE;

COPY products (id, name, slogan, description, default_price, category_id)
FROM '/Users/timothyloo/Desktop/Hack Reactor/TJ-Products-API/data/etlProducts.csv'
DELIMITER ','
CSV HEADER;

TRUNCATE styles CASCADE;

COPY styles (id, name, sale_price, default_sty, product_id)
FROM '/Users/timothyloo/Desktop/Hack Reactor/TJ-Products-API/data/etlStyles.csv'
DELIMITER ','
NULL AS 'null'
CSV HEADER;

TRUNCATE features CASCADE;

COPY features (id, feature, value)
FROM '/Users/timothyloo/Desktop/Hack Reactor/TJ-Products-API/data/etlFeatures.csv'
DELIMITER ','
NULL AS 'null'
CSV HEADER;

TRUNCATE skus CASCADE;

COPY skus (sku, style_id, size, quantity)
FROM '/Users/timothyloo/Desktop/Hack Reactor/TJ-Products-API/data/skus.csv'
DELIMITER ','
NULL AS 'null'
CSV HEADER;

TRUNCATE photos CASCADE;

COPY photos (id, style_id, url, thumbnail_url)
FROM '/Users/timothyloo/Desktop/Hack Reactor/TJ-Products-API/data/photos.csv'
DELIMITER ','
QUOTE '\'
ESCAPE '"'
NULL AS 'null'
CSV HEADER;

TRUNCATE products_features CASCADE;

COPY products_features (id, feature_id, product_id)
FROM '/Users/timothyloo/Desktop/Hack Reactor/TJ-Products-API/data/etlProducts_Features.csv'
DELIMITER ','
NULL AS 'null'
CSV HEADER;

TRUNCATE related_products CASCADE;

COPY related_products (id, product_id, related_product_id)
FROM '/Users/timothyloo/Desktop/Hack Reactor/TJ-Products-API/data/etlRelated.csv'
DELIMITER ','
NULL AS 'null'
CSV HEADER;