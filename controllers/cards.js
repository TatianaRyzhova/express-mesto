const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const ForbiddenError = require('../errors/forbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err));
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findById({ _id: req.params.cardId })
    .orFail(() => new NotFoundError('Карточка с указанным _id не найдена'))
    .then((card) => {
      if (!card.owner.equals(owner)) {
        next(new ForbiddenError('Вы не можете удалить чужую карточку'));
      } else {
        Card.deleteOne(card)
          .then(() => res.status(204).send({ message: 'Карточка успешно удалена' }));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.kind === 'ObjectId' || err.name === 'CastError') {
        next(new ValidationError('_id карточки имеет некорректный формат'));
      }
      next(err);
    });
};

const addLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new ValidationError('Переданы некорректные данные для постановки/снятии лайка'));
      }
      next(err);
    });
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new ValidationError('Переданы некорректные данные для постановки/снятии лайка'));
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
