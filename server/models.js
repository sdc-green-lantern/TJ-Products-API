const db = require('./db.js').client;

module.exports = {
  getProds: (count, page) => {
    return db.query(
      `SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, p.created_at, p.updated_at
      FROM r_products p
      WHERE p.id BETWEEN ${(page - 1) * count + 1} AND ${page * count}`
    );
  },

  getProduct: (id) => {
    return db.query(
      `SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, p.created_at, p.updated_at, p.features
      FROM r_products p
      WHERE p.id=${id}`
    );
  },

  getStyles: (id) => {
    let product;
    let promArr = [];
    return db
      .query(
        `SELECT sty.product_id, sty.styles results
      FROM r_styles sty
      WHERE sty.product_id=${id}`
      )
      .then(({ rows }) => {
        product = rows[0];
        for (const style of product.results) {
          promArr.push(
            db
              .query(
                `SELECT p.photos FROM r_photos p WHERE p.style_id=${style.style_id}`
              )
              .then(({ rows }) => (style.photos = rows[0].photos))
              .catch((err) => console.log(err))
          );
          promArr.push(
            db
              .query(
                `SELECT skus FROM r_skus sku WHERE sku.style_id=${style.style_id}`
              )
              .then(({ rows }) => (style.skus = rows[0].skus))
              .catch((err) => console.log(err))
          );
        }
      })
      .then(() => Promise.all(promArr).then(() => product))
      .catch((err) => console.log(err));
  },

  getRelated: (id) => {
    return db.query(
      `SELECT rp.related_products FROM r_related_products rp WHERE rp.product_id=${id}`
    );
  },
};
