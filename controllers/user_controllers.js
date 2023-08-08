const User = require('../models/user');
const BadRequestError = require('../utils/errors/badRequestError');
const { NOT_FOUND_ERROR_CODE, USER_NOT_FOUND, INCORRECT_DATA_EDIT_PROFILE } = require('../utils/constants');

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).json({
          message: USER_NOT_FOUND,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INCORRECT_DATA_EDIT_PROFILE));
      } else {
        next(err);
      }
    });
};

const getMe = (req, res, next) => {
  User.findOne({ id: req.user._id })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).json({
          message: USER_NOT_FOUND,
        });
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
