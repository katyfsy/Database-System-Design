const models = require('../models');

module.exports = {
  getQuestions(req, res) {
    const { product_id, page = 1, count = 5 } = req.query;
    const formattedResult = {
      product_id: product_id
    };

    models.getQuestions(product_id, page, count)
      .then((result) => {
        formattedResult.results = result.rows;
        console.log(result.rows);
        res.status(200).json(formattedResult);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  getAnswers(req, res) {
    const { question_id } = req.params;
    const { page = 1, count = 5 } = req.query;
    const formattedResult = {
      question: question_id,
      page: page,
      count: count
    };

    models.getAnswers(question_id, count, page)
      .then((result) => {
        formattedResult.results = result.rows;
        console.log(result.rows);
        res.status(200).json(formattedResult);
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
      .then((result) => res.status(204).send('Question Helpful Recorded'))
      .catch((err) => res.status(500).send(err));
  },

  putAnswerHelpful(req, res) {
    const { answer_id } = req.params;

    models.putAnswerHelpful(answer_id)
      .then((result) => res.status(204).send('Answer Helpful Recorded'))
      .catch((err) => res.status(500).send(err));
  },

  putReportQuestion(req, res) {
    const { question_id } = req.params;

    models.putReportQuestion(question_id)
      .then((result) => res.status(204).send('Question Reported'))
      .catch((err) => res.status(500).send(err));
  },

  putReportAnswer(req, res) {
    const { answer_id } = req.params;

    models.putReportAnswer(answer_id)
      .then((result) => res.status(204).send('Answer Reported'))
      .catch((err) => res.status(500).send(err));
  },

};
