const { json } = require('express');
const models = require('./models.js');

module.exports = {
  getProds: (req, res) => {
    const { count = 5, page = 1 } = req.query;
    models
      .getProds(count, page)
      .then(({ rows }) => res.json(rows))
      .catch((err) => res.send(err));
  },

  getProduct: (req, res) => {
    const { product_id } = req.params;
    models
      .getProduct(product_id)
      .then(({ rows }) => res.json(rows[0]))
      .catch((err) => res.send(err));
  },

  getStyles: (req, res) => {
    const { product_id } = req.params;
    models
      .getStyles(product_id)
      .then((results) => res.json(results))
      .catch((err) => res.send(err));
  },

  getRelated: (req, res) => {
    const { product_id } = req.params;
    models
      .getRelated(product_id)
      .then(({ rows }) => res.json(rows[0].related_products))
      .catch((err) => res.send(err));
  },
};
