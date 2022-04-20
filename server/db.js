const {Pool, Client} = require('pg');

require('dotenv').config();
const {USER} = process.env;
const {PASSWORD} = process.env;
const {PORT} = process.env;

// const client = new Client({
//   user: USER,
//   password: PASSWORD,
//   host: 'localhost',
//   port: PORT,
//   database: 'qa'
// });


// client.connect(err => {
//   if (err) {
//     console.error('connection error', err.stack)
//   } else {
//     console.log('connected')
//   }
// })

const pool = new Pool({
  host: 'localhost',
  user: USER,
  password: PASSWORD,
  port: PORT,
  database: 'qa',
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool
  .connect()
  .then(() => console.log("PostgreSQL Connected!"))
  .catch((err) => console.error(err));


// module.exports = client;
module.exports = pool;