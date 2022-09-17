require('dotenv').config();
const { Client } = require('pg');

// dont set the port to the same one as your server
const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

client
  .connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.log('THIS ERROR', err));
// dont close this
// .finally(client.end());

module.exports = { client };
