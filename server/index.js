require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes.js');

// Establishes connection to the database on server start
// This is ETL so Comment out for hosting!!!
// const client = require('./etlDb.js').client;

const client = require('./db.js').client;

app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 8000;

module.exports = { app };

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
