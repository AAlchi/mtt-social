const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use('/', require("./routes/userRoutes.js"))

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})