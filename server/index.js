const express = require('express');

const app = express();
const cors = require('cors');
// const morgan = require('morgan');
const pool = require('./database');
const router = require('./routes');

require('dotenv').config();

const { SERVER_PORT } = process.env;

// middleware
app.use(cors());
// app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.get('/loaderio-8cac818c65c703f7685aee17c86e76c1', (req, res) => {
  res.sendFile('../loaderio-8cac818c65c703f7685aee17c86e76c1.txt');
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on ${SERVER_PORT}`);
});
