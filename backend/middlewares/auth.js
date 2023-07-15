const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized-error');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    const err = new UnauthorizedError('Authorization required');
    next(err);
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'verysecretword');
  } catch (e) {
    const err = new UnauthorizedError('Authorization required');
    next(err);
    return;
  }
  req.user = payload;
  next();
};

module.exports = {
  auth,
};
