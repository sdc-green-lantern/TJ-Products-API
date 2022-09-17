require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const router = require('./routes.js');

// Establishes connection to the database on server start
// This is ETL so Comment out for hosting!!!
// const client = require('./etlDb.js').client;

const client = require('./db.js').client;

app.use(express.json());
app.use(morgan('dev'));

app.use(router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = { app, PORT };
