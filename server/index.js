const express = require ('express');
const app = express();
const cors = require ('cors');
const morgan = require ('morgan');
// const pool = require('./db.js');

require('dotenv').config();
const PORT = process.env.PORT;

//middleware
app.use(cors());
// app.use(morgan());
app.use(express.json());

app.listen(PORT, ()=>{
  console.log(`Server is listening on ${PORT}`)
});


