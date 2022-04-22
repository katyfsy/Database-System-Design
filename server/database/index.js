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

const queryString = ' select array_to_json(array_agg(row_to_json(ToBuild))) from (select question.id, question.product_id, question.asker_name, array_agg(question_addon.jo_answer_item) from questions question left join (select answer_tbl.question_id, json_build_object(answer_id, array_photo_id) as jo_answer_item  from (select answer.question_id, answer.id as answer_id, array_agg(photo.id) as array_photo_id from answers answer left join answers_photos photo on photo.answer_id = answer.id group by answer.id, answer.question_id) answer_tbl) question_addon on question_addon.question_id = question.id where question.id = 28 group by question.id, question.product_id, question.asker_name)ToBuild';

pool
  .query(queryString)
  .then(res => console.log(res.rows[0]))
  .catch(err => console.error('Error executing query', err.stack))