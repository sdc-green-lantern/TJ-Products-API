const controllers = require('./contollers.js');
const router = require('express').Router();

router.get('/products', controllers.getProds);

router.get('/products/:product_id', controllers.getProduct);

router.get('/products/:product_id/styles', controllers.getStyles);

router.get('/products/:product_id/related', controllers.getRelated);

module.exports = router;
