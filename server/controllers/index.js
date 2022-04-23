const models = require('../models');

module.exports = {
  getQuestions(req, res) {
    const { product_id, page, count } = req.query;
    const formattedresult = [];

    models.getQuestions(product_id)
      .then((result) => {
        console.log(result.rows);
        res.status(200).json(result.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  getAnswers(req, res) {
    const { question_id } = req.params;
    const { page, count } = req.query;

    console.log(page, count, question_id);

    models.getAnswers(question_id)
      .then((result) => {
        console.log(result.rows);
        res.status(200).json(result.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  postQuestion(req, res) {
    const {
      product_id, body, name, email,
    } = req.body;
    models.postQuestion(product_id, body, name, email)
      .then((result) => res.status(200).send('Question Created'))
      .catch((err) => res.status(500).send(err));
  },

  postAnswer(req, res) {
    const { question_id } = req.params;

    const {
      body, name, email, photos,
    } = req.body;
    console.log(typeof (question_id), typeof (body), typeof (name), typeof (email), typeof (photos));

    models.postAnswer(question_id, body, name, email, photos)
      .then((result) => res.status(200).send('Answer Created'))
      .catch((err) => {
        res.status(500).send(err);
        console.log(err.message);
      });
  },

  putQuestionHelpful(req, res) {
    const { question_id } = req.params;

    models.putQuestionHelpful(question_id)
      .then((result) => res.status(200).send('Question Helpful Recorded'))
      .catch((err) => res.status(500).send(err));
  },

  putAnswerHelpful(req, res) {
    const { answer_id } = req.params;

    models.putAnswerHelpful(answer_id)
      .then((result) => res.status(200).send('Answer Helpful Recorded'))
      .catch((err) => res.status(500).send(err));
  },

  putReportQuestion(req, res) {
    const { question_id } = req.params;

    models.putReportQuestion(question_id)
      .then((result) => res.status(200).send('Question Reported'))
      .catch((err) => res.status(500).send(err));
  },

  putReportAnswer(req, res) {
    const { answer_id } = req.params;

    models.putReportAnswer(answer_id)
      .then((result) => res.status(200).send('Answer Reported'))
      .catch((err) => res.status(500).send(err));
  },

};
