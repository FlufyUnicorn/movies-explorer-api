const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { SUCCESS_CREATED_CODE, EMAIL_EXISTS, REG_INCORRECT } = require('../utils/constants');
const BadRequestError = require('../utils/errors/badRequestError');
const ConflictError = require('../utils/errors/ConflictError');
const { getJWT } = require('../utils/getJWT');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.checkUser(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, getJWT(), { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        name, email, password: hash,
      },
    )
      .then((user) => {
        res.status(SUCCESS_CREATED_CODE).send({
          name: user.name, email: user.email,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError(EMAIL_EXISTS));
        } else if (err.name === 'ValidationError') {
          next(new BadRequestError(REG_INCORRECT));
        } else {
          next(err);
        }
      }));
};

module.exports = {
  login,
  createUser,
};
