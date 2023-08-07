const Movie = require('../models/movie');
const {MOVIE_NOT_FOUND, FORBIDDEN_DELETE_MOVIE, INCORRECT_DATA_DELETE_MOVIE
} = require('../utils/constants');
const BadRequestError = require('../utils/errors/badRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

const createMovie = (req, res, next) => {
  const movie = req.body;
  Movie.create({...movie, owner: req.user._id})
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  console.log(req.params)
  return Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(MOVIE_NOT_FOUND));
      }
      if (!movie.owner.equals(req.user._id)) {
         return next(new ForbiddenError(FORBIDDEN_DELETE_MOVIE));
      }
      return Movie.deleteOne(movie)
        .then(() => {
          res.send({ message: 'Фильм удален' });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INCORRECT_DATA_DELETE_MOVIE));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  Movie.find({owner: req.user._id})
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
