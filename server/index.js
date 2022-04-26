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

app.get('/loaderio-b539a0892ed0f8f5424850f0baf7bdc6', (req, res) => {
  res.sendFile('/home/sdcserver/sdc-qa/loaderio-b539a0892ed0f8f5424850f0baf7bdc6.txt');
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on ${SERVER_PORT}`);
});
