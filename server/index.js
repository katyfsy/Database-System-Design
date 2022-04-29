const express = require('express');

const app = express();
const cors = require('cors');
// const redis = require('redis');

// (async () => {
//   const client = redis.createClient({
//     legacyMode: true,
//   });

//   client.on('error', (err) => console.log('Redis Client Error', err));

//   await client.connect();

//   await client.set('key', 'value');
//   const value = await client.get('key');
// })();

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

app.get('/loaderio-9e66c8a0bc1c4a50d78d79667a19821f', (req, res) => {
  res.sendFile('/home/ubuntu/sdcserver/sdc-qa/loaderio-9e66c8a0bc1c4a50d78d79667a19821f.txt');
});

app.get("/", (req, res) => {
  res.json({ message: "Heck ya docker!! 🐳" });
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on ${SERVER_PORT}`);
});
