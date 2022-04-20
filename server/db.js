const Pool = require('pg').Pool;

require('dotenv').config();
const {USER} = process.env;
const {PASSWORD} = process.env;
const {PORT} = process.env;

const pool = new Pool({
  user: USER,
  password: PASSWORD,
  host: 'localhost',
  port: PORT,
  database: ''
});

module.exports = pool;