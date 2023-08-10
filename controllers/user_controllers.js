const User = require('../models/user');
const BadRequestError = require('../utils/errors/badRequestError');
const { USER_NOT_FOUND, INCORRECT_DATA_EDIT_PROFILE, EMAIL_EXISTS } = require('../utils/constants');
const ConflictError = require('../utils/errors/ConflictError')
const NotFoundError = require('../utils/errors/NotFoundError')
const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INCORRECT_DATA_EDIT_PROFILE));
      } else if (err.codeName === 'DuplicateKey') {
        next(new ConflictError(EMAIL_EXISTS));
      } else {
        next(err);
      }
    });
};

const getMe = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  updateProfile,
  getMe,
};
