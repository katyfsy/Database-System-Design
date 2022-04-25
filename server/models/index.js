const pool = require('../database');

module.exports = {
  getQuestions(product_id, page, count) {
    const queryString = `
      SELECT
        questions.id AS question_id,
        questions.question_body,
        to_timestamp(questions.question_date/1000) AS question_date,
        questions.asker_name,
        questions.reported,
        questions.helpful AS question_helpfulness,COALESCE (
          JSON_OBJECT_AGG(answers.id,
            JSON_BUILD_OBJECT(
              'id', answers.id,
              'body', answers.answer_body,
              'date', to_timestamp(answers.answer_date/1000),
              'answerer_name', answers.answer_name,
              'helpfulness', answers.helpful,
              'photos',
              ARRAY (SELECT answers_photos.photo_url as URL FROM answers_photos WHERE answers_photos.answer_id = answers.id )
            )
          )
          FILTER (WHERE answers.id IS NOT NULL),
          '{}'::JSON
        ) AS answers
      FROM questions
      LEFT JOIN
        answers
      ON questions.id = answers.question_id
      WHERE product_id = $1
      AND questions.reported = false
      GROUP BY questions.id
      LIMIT $2
      OFFSET $3
      `;
    const values = [product_id, count, count * page - count];

    return pool.query(queryString, values);
  },

  getAnswers(question_id, count, page) {
    const queryString = `
      SELECT
        answers.id AS answer_id,
        answers.answer_body,
        to_timestamp(answers.answer_date/1000) AS date,
        answers.answer_name,
        answers.answer_email,
        answers.reported,
        answers.helpful,
        COALESCE (
            json_agg(
              json_build_object(
                  'id', answers_photos.id, 'answer id', answers_photos.answer_id, 'url', answers_photos.photo_url))
          FILTER (WHERE answers_photos.id IS NOT NULL), '[]') AS photos
      FROM answers
      LEFT JOIN
        answers_photos
      ON answers.id = answers_photos.answer_id
      WHERE answers.question_id = $1
      AND answers.reported = false
      GROUP BY answers.id
      LIMIT $2
      OFFSET $3
      ;`;
    const values = [question_id, count, count * page - count];

    return pool.query(queryString, values);
  },

  postQuestion(product_id, body, name, email) {
    const queryString = `
      INSERT INTO
        questions
          (product_id, question_body, question_date, asker_name, asker_email)
        VALUES
          ($1, $2, extract(epoch from now()) * 1000, $3, $4)`;

    const values = [product_id, body, name, email];

    return pool.query(queryString, values);
  },

  postAnswer(question_id, body, name, email, photos) {
    const queryString = `
    WITH answer_post AS(
      INSERT INTO
        answers
          (question_id, answer_body, answer_date, answer_name, answer_email)
        VALUES
          ($1, $2, extract(epoch from now()) * 1000, $3, $4)
      RETURNING id
    )
    INSERT INTO
      answers_photos
        (answer_id, photo_url)
      VALUES
      ((select id FROM answer_post), unnest($5::text[]));
    `;

    const values = [question_id, body, name, email, photos];

    return pool.query(queryString, values);
  },

  putQuestionHelpful(question_id) {
    const queryString = `
      UPDATE questions
      SET helpful = helpful + 1
      WHERE id = $1;`;
    const values = [question_id];

    return pool.query(queryString, values);
  },

  putAnswerHelpful(answer_id) {
    const queryString = `
      UPDATE answers
      SET helpful = helpful + 1
      WHERE id = $1`;
    const values = [answer_id];

    return pool.query(queryString, values);
  },

  putReportQuestion(question_id) {
    const queryString = `
      UPDATE questions
      SET reported = TRUE
      WHERE id = $1`;
    const values = [question_id];

    return pool.query(queryString, values);
  },

  putReportAnswer(answer_id) {
    const queryString = `
      UPDATE answers
      SET reported = TRUE
      WHERE id = $1`;
    const values = [answer_id];

    return pool.query(queryString, values);
  },
};
