require('dotenv').config();
const fs = require('fs/promises');
const { Client } = require('pg');
const etProducts = require('../etl/etProducts.js').etProducts;
const etStyles = require('../etl/etStyles.js').etStyles;
const etFeatures = require('../etl/etFeatures.js').etFeatures;
const etRelated = require('../etl/etRelated.js').etRelated;
const etPhotos = require('../etl/etPhotos.js').etPhotos;

// dont set the port to the same one as your server
const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

client
  .connect()
  .then(() => console.log('Connected to PostgreSQL'))
  // .then(() => fs.readFile('./database/products.sql', 'utf8'))
  // .then((script) => client.query(script))
  // .then(() => etProducts(client))
  // .then(() => etStyles(client))
  // .then(() => etFeatures(client))
  // .then(() => etRelated(client))
  .then(() => etPhotos(client))
  .then(() => {
    client.query(`TRUNCATE cart`);
    client.query(`INSERT INTO cart (cookie_id, products) VALUES ($1, $2)`, [
      '1',
      '[{ "sku1": 1 }, {"sku2": 2}]',
    ]);
  })
  .then(() =>
    client.query(`INSERT INTO cart (cookie_id, products) VALUES ($1, $2)`, [
      '2',
      '[{ "defg": 1 }]',
    ])
  )
  .then((res) => console.log('cart loaded'))
  .catch((err) => console.log('THIS ERROR', err));
// dont close this
// .finally(client.end());

module.exports = { client };
