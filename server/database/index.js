const { Pool } = require('pg');

require('dotenv').config();

const { USER, PASSWORD, DB_PORT } = process.env;

const pool = new Pool({
  host: 'ec2-34-201-112-63.compute-1.amazonaws.com',
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

// const queryString = 'SELECT * from questions LEFT JOIN answers on questions.id = answers.question_id LEFT JOIN answers_photos ON answers.id = answers_photos.answer_id WHERE questions.product_id = $1 ORDER BY questions.helpful DESC;';
// const values = [37312];

// pool
//   .query(queryString, values)
//   .then((res) => console.log(res.rows))
//   .catch((err) => console.error('Error executing query', err.stack));
