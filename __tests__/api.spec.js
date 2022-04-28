const path = require('path');
const frisby = require('frisby');

const { Joi } = frisby;

const baseUrl = 'http://ec2-3-239-207-192.compute-1.amazonaws.com:3030';

beforeAll(() => {
  frisby.addExpectHandler('is Product_id 102', (response) => {
    const { json } = response;
    expect(json.product_id).toBe('102');
    expect(json.results.length).toBe(2);
    expect(json.results[0].question_id).toBe(331);
    expect(json.results[0].question_body).toBe('Dolorum dolorum perferendis cupiditate ut non.');
    expect(json.results[0].question_date).toBe('2020-11-26T20:11:03.000Z');
    expect(json.results[0].asker_name).toBe('Terrance.Hills');
    expect(json.results[0].question_helpfulness).toBe(8);
  });

  frisby.addExpectHandler('is Question_id 553583', (response) => {
    const { json } = response;
    expect(json.question).toBe('553583');
    expect(json.page).toBe(1);
    expect(json.count).toBe(5);
    expect(json.results[0].answer_id).toBe(1081814);
    expect(json.results[0].answer_body).toBe('Quas sed et nihil praesentium quidem vel.');
    expect(json.results[0].date).toBe('2020-04-28T21:26:13.000Z');
    expect(json.results[0].answer_name).toBe('Keegan_Rath');
    expect(json.results[0].helpful).toBe(1);
  });
});

describe('Get Questions', () => {
  it('Should return status 200', () => frisby
    .get(path.join(baseUrl, '/qa/questions?page=1&count=5&product_id=102'))
    .expect('status', 200));

  it('Body should contain all data', () => frisby
    .get(path.join(baseUrl, '/qa/questions?page=1&count=5&product_id=102'))
    .expect('status', 200)
    .expect('bodyContains', 'product_id', 'question_id', 'question_body', 'question_date', 'asker_name', 'reported', 'question_helpfulness', 'answers'));

  it('Should return valid values', () => frisby
    .get(path.join(baseUrl, '/qa/questions?page=1&count=5&product_id=102'))
    .expect('is Product_id 102'));

  it('Body should contain all data', () => frisby
    .get(path.join(baseUrl, '/qa/questions?page=1&count=5&product_id=102'))
    .expect('jsonTypes', {
      product_id: Joi.string(),
      results: Joi.array(),
    }));
});

describe('Get Answers', () => {
  it('Should return status 200', () => frisby
    .get(path.join(baseUrl, '/qa/questions/553583/answers'))
    .expect('status', 200));

  it('Body should contain all data', () => frisby
    .get(path.join(baseUrl, '/qa/questions/553583/answers'))
    .expect('status', 200)
    .expect('bodyContains', 'question', 'page', 'count', 'results'));

  it('Should return valid values', () => frisby
    .get(path.join(baseUrl, '/qa/questions/553583/answers'))
    .expect('is Question_id 553583'));

  it('Body should contain all data', () => frisby
    .get(path.join(baseUrl, '/qa/questions/553583/answers'))
    .expect('jsonTypes', {
      question: Joi.string(),
      page: Joi.number(),
      count: Joi.number(),
      results: Joi.array(),
    }));
});

describe('Post Questions', () => {
  it('Should return status 200', () => frisby
    .post(path.join(baseUrl, '/qa/questions'), {
      body: {
        product_id: 1,
        body: 'this not work * 4',
        name: 'guesswho',
        email: 'guesswho@gmail.com',
      },
    })
    .expect('status', 200));
});

describe('Post Answers', () => {
  it('Should return status 200', () => frisby
    .post(path.join(baseUrl, '/qa/questions/1/answers'), {
      body: {
        body: 'My Best Answer',
        name: 'guesswho1',
        email: 'guesswho1@gmail.com',
        photos: ['https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg', 'https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg', 'https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg'],
      },
    })
    .expect('status', 200));
});

afterAll(() => {
  frisby.removeExpectHandler('is Product_id 102');
  frisby.removeExpectHandler('is Question_id 553583');
});
