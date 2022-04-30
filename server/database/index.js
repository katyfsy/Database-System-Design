const { Pool } = require('pg');

require('dotenv').config();

const { USER, PASSWORD, DB_PORT } = process.env;

const pool = new Pool({
  host: 'ec2-54-91-143-76.compute-1.amazonaws.com',
  user: USER,
  password: PASSWORD,
  port: DB_PORT,
  database: 'questionsanswers',
});

pool
  .connect()
  .then(() => console.log('PostgreSQL Connected!'))
  .catch((err) => console.error(err));

module.exports = pool;