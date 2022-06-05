const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dontenv = require('dotenv');
const authRoute = require('./routes/auth');
const { Router } = require('express');

dontenv.config();

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_URL,).then(()=> console.log('DB CONN SUCCULENT'));
  }

  app.use(express.json());
  app.use('/api/auth', authRoute);
app.listen(8800, () => {
    console.log('backend server is running');
});

