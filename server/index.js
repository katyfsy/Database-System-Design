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

app.get('/loaderio-93993d38275c05ad5b8e1bc78fd53504', (req, res) => {
  res.sendFile('/home/ubuntu/sdcserver/sdc-qa/loaderio-93993d38275c05ad5b8e1bc78fd53504.txt');
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on ${SERVER_PORT}`);
});
