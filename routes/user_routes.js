const userRoutes = require('express').Router();
const { updateProfile, getMe } = require('../controllers/user_controllers');
const { validationUserEdit } = require('../utils/validators/userValidator');

userRoutes.get('/users/me', getMe);
userRoutes.patch('/users/me', validationUserEdit, updateProfile);

module.exports = userRoutes;
