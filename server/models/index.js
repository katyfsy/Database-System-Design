const pool = require('../database');

module.exports = {
  getQuestions() {
    const queryString = 'SELECT * from questions LEFT JOIN answers on questions.id = answers.question_id LEFT JOIN answers_photos ON answers.id = answers_photos.answer_id WHERE questions.product_id = 37312 ORDER BY questions.helpful DESC';

    pool
      .query(queryString)
      .then((res) => console.log(res.rows[0].name))
      .catch((err) => console.error('Error executing query', err.stack));
  },

  getAnswers() {
    const queryString = 'select array_to_json(array_agg(row_to_json(ToBuild))) from (select question.id, question.product_id, question.asker_name, array_agg(question_addon.jo_answer_item) from questions question left join (select answer_tbl.question_id, json_build_object(answer_id, array_photo_id) as jo_answer_item  from (select answer.question_id, answer.id as answer_id, array_agg(photo.id) as array_photo_id from answers answer left join answers_photos photo on photo.answer_id = answer.id group by answer.id, answer.question_id) answer_tbl) question_addon on question_addon.question_id = question.id where question.id = 28 group by question.id, question.product_id, question.asker_name)ToBuild';

    pool
      .query(queryString)
      .then((res) => console.log(res.rows[0].name))
      .catch((err) => console.error('Error executing query', err.stack));
  },

  postQuestion() {
    const queryString = 'INSERT INTO questions(product_id, question_body, question_date, asker_name, asker_email) VALUES(686356, 'a question', extract(epoch from now()) * 1000, 'bee', 'bee@gmail.com')';

    pool
      .query(queryString)
      .then((res) => console.log(res.rows[0].name))
      .catch((err) => console.error('Error executing query', err.stack));
  },

  postAnswer() {
    const queryString = 'INSERT INTO answers (question_id, answer_body, answer_date, answer_name, answer_email) VALUES (1, 'an answer', extract(epoch from now()) * 1000, 'honey', 'honey@gmail.com')';

    pool
    .query(queryString)
    .then((res) => console.log(res.rows[0].name))
    .catch((err) => console.error('Error executing query', err.stack));
  },

  putQuestionHelpful() {
    const queryString = 'UPDATE questions SET helpful = helpful + 1 WHERE id = 8;';

    pool
    .query(queryString)
    .then((res) => console.log(res.rows[0].name))
    .catch((err) => console.error('Error executing query', err.stack));

  },

  putAnswerHelpful() {
    const queryString = 'UPDATE answers SET helpful = helpful + 1 WHERE id = 3';

    pool
    .query(queryString)
    .then((res) => console.log(res.rows[0].name))
    .catch((err) => console.error('Error executing query', err.stack));

  },

  putReportQuestion() {
    const queryString = 'UPDATE questions SET reported = TRUE WHERE id = 9';

    pool
    .query(queryString)
    .then((res) => console.log(res.rows[0].name))
    .catch((err) => console.error('Error executing query', err.stack));

  },

  putReportAnswer() {
    const queryString = 'UPDATE answers SET reported = TRUE WHERE id = 9';

    pool
    .query(queryString)
    .then((res) => console.log(res.rows[0].name))
    .catch((err) => console.error('Error executing query', err.stack));

  },
};
