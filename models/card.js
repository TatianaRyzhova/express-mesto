const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Имя карточки не может быть меньше двух знаков'],
    maxlength: 30,
    required: [true, 'Имя карточки обязательно для заполнения'],
  },
  link: {
    type: String,
    required: [true, 'Ссылка обязательна для заполнения'],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Types.ObjectId,
    default: [],
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
