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

app.get('/loaderio-bd7cee00f6d2be3cc8adfb1d2a93075a', (req, res) => {
  res.sendFile('/home/ubuntu/sdcserver/sdc-qa/loaderio-bd7cee00f6d2be3cc8adfb1d2a93075a.txt');
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on ${SERVER_PORT}`);
});
