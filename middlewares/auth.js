const jwt = require('jsonwebtoken');
const { getJWT } = require('../utils/getJWT');
const UnauthorizedError = require('../utils/errors/unauthorizedError');
const { AUTH_REQUIRED } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(AUTH_REQUIRED));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, getJWT());
  } catch (err) {
    return next(new UnauthorizedError(AUTH_REQUIRED));
  }
  req.user = payload;
  next();
};
