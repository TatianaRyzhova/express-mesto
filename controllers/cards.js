const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => res.send(card));
};

const addLike = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => res.send(card));
};

const deleteLike = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => res.send(card));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
