const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '6057326b8cb2edee701a58cd',
  };

  next();
});

app.use(bodyParser.json());
app.use(router);
router.use((req, res) => {
  res.status(404).send({ message: `Ресурс по адресу ${req.path} не найден` });
});

app.listen(PORT, () => {
  console.log('App starts');
});
