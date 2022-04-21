const express = require('express');

const app = express();
const cors = require('cors');
const morgan = require('morgan');
const pool = require('./database');

require('dotenv').config();

const { SERVER_PORT } = process.env;

// middleware
app.use(cors());
// app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on ${SERVER_PORT}`);
});