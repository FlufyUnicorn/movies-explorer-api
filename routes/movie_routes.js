const movieRoutes = require('express').Router();
const { createMovie, deleteMovie, getMovies } = require('../controllers/movie_controllers');
const { validationCreateMovie, validationMovieId } = require('../utils/validators/movieValidator');

movieRoutes.get('/movies', getMovies);
movieRoutes.post('/movies', validationCreateMovie, createMovie);
movieRoutes.delete('/movies/:_id', validationMovieId, deleteMovie);

module.exports = movieRoutes;