require('dotenv').config();
const { Client, Pool } = require('pg');

// dont set the port to the same one as your server
const client = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

client
  .connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.log('THIS ERROR', err));
// dont close this
// .finally(client.end());

module.exports = { client };
