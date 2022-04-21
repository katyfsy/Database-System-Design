const { Pool } = require('pg');

require('dotenv').config();

const { USER, PASSWORD, DB_PORT } = process.env;

const pool = new Pool({
  host: 'localhost',
  user: USER,
  password: PASSWORD,
  port: DB_PORT,
  database: 'qa',
});

pool
  .connect()
  .then(() => console.log('PostgreSQL Connected!'))
  .catch((err) => console.error(err));

module.exports = pool;