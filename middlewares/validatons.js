const { celebrate, Joi } = require('celebrate');

const userCreateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "about" - 2',
        'string.max': 'Максимальная длина поля "about" - 30',
      }),
    avatar: Joi.string()
      .pattern(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      ),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'Минимальная длина поля "password" - 8',
      }),
  }),
});

const updateUserValidation = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.required(),
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "about" - 2',
        'string.max': 'Максимальная длина поля "about" - 30',
      }),
  }),
});

const updateAvatarValidation = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.required(),
  }).unknown(),
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .pattern(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      ),
  }),
});

const getUserByIdValidation = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.required(),
  }).unknown(),
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createCardValidation = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.required(),
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
    link: Joi.string().required()
      .pattern(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      ),
  }),
});

const cardIdValidation = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.required(),
  }).unknown(),
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  userCreateValidation,
  updateUserValidation,
  updateAvatarValidation,
  getUserByIdValidation,
  loginValidation,
  createCardValidation,
  cardIdValidation,
};
