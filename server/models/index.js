const pool = require('../database');

module.exports = {
  getQuestions(product_id, page, count) {
    const queryString = `
    SELECT row_to_json(quest)
    from(
      select product_id,
      (
        select json_agg(json_build_object('question_id', questions.id, 'question_body', question_body, 'question_date', question_date, 'asker_name', asker_name, 'question_helpfulness', helpful, 'reported', reported, 'answers',
        (
          select json_object_agg(
            id, json_build_object(
              'id', id,
              'body', answer_body,
              'date', answer_date,
              'answerer_name', answer_name,
              'helpfulness', helpful,
              'photos',
              (select array
                (select photo_url from answers_photos where answer_id = answers.id)
              )
            )
          )
        from answers
        where question_id = questions.id
        )
      ))
      from questions
      where product_id = $1  AND reported = false
      ) as results
      from questions where product_id = $1
    ) quest
      LIMIT $2
      OFFSET $3
      `;
    const values = [product_id, count, count * page - count];

    return pool.query(queryString, values);
  },

  getAnswers(question_id, count, page) {
    const queryString = `
    SELECT json_build_object(
      'question', id,
      'page', ${page},
      'count', ${count},
      'results',
      (
        select json_agg(
          json_build_object(
            'answer_id', id,
            'body', answer_body,
            'date', answer_date,
            'answerer_name', answer_name,
            'helpfulness', helpful,
            'photos',
            (select json_agg(
              json_build_object(
                'id', id,
                'url', photo_url
              )
            ) from answers_photos
            where answer_id = answers.id
          )
        )
      ) as results
      from answers
      where question_id = questions.id
      )
    ) from questions where id = $1
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
