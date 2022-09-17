const db = require('./db.js').client;

module.exports = {
  getProds: (count, page) => {
    return db.query(
      `SELECT p.id, p.name, p.slogan, p.description, c.name category, p.default_price, p.created_at, p.updated_at FROM products p
      JOIN categories c ON p.category_id = c.id
      OFFSET ${(page - 1) * count} LIMIT ${count}`
    );
  },

  getProduct: (id) => {
    return db.query(`
    SELECT p.id, p.name, p.slogan, p.description, p.default_price, p.created_at, p.updated_at, c.name category,
      (
        SELECT array_agg(json_build_object('feature',f.feature, 'value',f.value))
        FROM features f
        JOIN products_features pf ON f.id=pf.feature_id
        JOIN products p ON pf.product_id=p.id WHERE p.id=${id}
      ) features
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.id=${id}
    `);
  },

  getStyles: (id) => {
    return db.query(`
    SELECT prod.id product_id,
      (
        SELECT array_agg(json_build_object(
          'style_id', s.id,
          'name', s.name,
          'original_price', prod.default_price,
          'sale_price', s.sale_price,
          'default?', s.default_sty,
          'photos', (SELECT array_agg(json_build_object(
            'thumbnail_url', phot.thumbnail_url,
            'url', phot.url
            ))
            FROM photos phot
            WHERE phot.style_id=s.id
          ),
          'skus', (
            SELECT json_object_agg(sku, (
              SELECT json_build_object('quantity',quantity,'size',size)
              FROM skus sku1
              WHERE sku1.sku=sku2.sku))
            FROM skus sku2
            WHERE sku2.style_id=s.id)
        ))
        FROM styles s
        WHERE s.product_id=${id}
      ) results
    FROM products prod
    WHERE prod.id=${id}
    `);
  },
  getRelated: (id) => {
    return db.query(`
    SELECT array_agg(rp.related_product_id) related_products FROM related_products rp
    WHERE rp.product_id=${id}
    `);
  },
};
