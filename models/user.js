const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя обязательно для заполнения'],
    minlength: [2, 'Имя не может быть меньше двух знаков'],
    maxlength: 30,
  },
  about: {
    type: String,
    required: [true, 'О себе обязательно для заполнения'],
    minlength: [2, 'О себе не может быть меньше двух знаков'],
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, 'Аватар обязателен для заполнения'],
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
