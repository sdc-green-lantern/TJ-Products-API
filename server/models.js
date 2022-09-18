const db = require('./db.js').client;

module.exports = {
  getProds: (count, page) => {
    return db.query(
      `SELECT p.id, p.name, p.slogan, p.description, c.name category, p.default_price, p.created_at, p.updated_at FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.id BETWEEN ${(page - 1) * count + 1} AND ${page * count}`
    );
  },

  getProduct: (id) => {
    let product = {};
    db.query(
      `
    SELECT f.feature, f.value FROM features f
    JOIN products_features pf ON f.id=pf.feature_id
    WHERE pf.product_id=${id}`
    )
      .then(({ rows }) => {
        product.features = rows;
      })
      .catch((err) => err);
    return db
      .query(
        `
      SELECT p.id, p.name, p.slogan, p.description, p.default_price, c.name category, p.created_at, p.updated_at
      FROM products p
      JOIN categories c ON p.category_id=c.id
      WHERE p.id=${id}
      `
      )
      .then(({ rows }) => {
        product = Object.assign(product, rows[0]);
        return product;
      })
      .catch((err) => err);
  },

  getStyles: (id) => {
    let product = {};
    let original_price;
    db.query(
      `
    SELECT prod.id product_id, prod.default_price
    FROM products prod
    WHERE prod.id=${id}`
    )
      .then(({ rows }) => {
        product.product_id = rows[0].product_id;
        original_price = rows[0].default_price;
      })
      .catch((err) => console.log(err));
    return db
      .query(
        `SELECT s.id style_id, s.name, s.sale_price, s.default_sty "default?"
        FROM styles s WHERE s.product_id=${id}`
      )
      .then(({ rows }) => {
        product.results = rows;
        let promiseArr = [];
        product.results.forEach((style) => {
          style.original_price = original_price;
          promiseArr.push(
            db
              .query(
                `SELECT phot.thumbnail_url, phot.url
              FROM photos phot WHERE phot.style_id=${style.style_id}`
              )
              .then(({ rows }) => {
                style.photos = rows;
              })
              .catch((err) => console.log(err))
          );
          promiseArr.push(
            db
              .query(
                `SELECT json_object_agg(sku, json_build_object('quantity', quantity, 'size',size)) as skus
              FROM skus
              WHERE skus.style_id=${style.style_id}`
              )
              .then(({ rows }) => {
                style.skus = rows[0].skus;
              })
              .catch((err) => console.log(err))
          );
        });
        return Promise.all(promiseArr).then(() => product);
      })
      .catch((err) => console.log(err));
  },

  getRelated: (id) => {
    return db.query(`
    SELECT array_agg(rp.related_product_id) related_products FROM related_products rp
    WHERE rp.product_id=${id}
    `);
  },
};
