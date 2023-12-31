const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cards = require('../controllers/cards');
const URL_REGEX = require('../constants/regex');

const {
  getCards,
  createCard,
  removeCard,
  likeCard,
  unlikeCard,
} = cards;

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(8).max(30),
    link: Joi.string()
      .required()
      .pattern(URL_REGEX),
  }),
}), createCard);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), removeCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), unlikeCard);

module.exports = router;
