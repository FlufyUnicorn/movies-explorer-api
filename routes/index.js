const router = require('express').Router();
const  auth  = require('../middlewares/auth');
const userRouter = require('./user_routes');
const movieRouter = require('./movie_routes');
const { validationCreateUser, validationLoginUser } = require('../utils/validators/userValidator');
const { login, createUser } = require('../controllers/auth');
const NotFoundError = require('../utils/errors/NotFoundError');

router.post('/signin', validationLoginUser, login);
router.post('/signup', validationCreateUser, createUser);
router.use(auth);
router.use(userRouter);
router.use(movieRouter);

router.use('*', () => {
  throw new NotFoundError('Запрашиваемый адрес не найден. Проверьте URL и метод запроса');
});

module.exports = router;