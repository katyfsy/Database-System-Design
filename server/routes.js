const router = require('express').Router();
const controller = require('./controllers');

router.get('/qa/questions', controller.getQuestions);
router.get('/qa/questions/:question_id/answers', controller.getAnswers);
router.post('/qa/questions', controller.postQuestion);
router.post('/qa/questions/:question_id/answers', controller.postAnswer);
router.put('/qa/questions/:question_id/helpful', controller.putQuestionHelpful);
router.put('/qa/answers/:answer_id/helpful', controller.putAnswerHelpful);
router.put('/qa/questions/:question_id/report', controller.putReportQuestion);
router.put('/qa/answers/:answer_id/report', controller.putReportAnswer);
