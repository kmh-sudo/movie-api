const Movie = require("../models/movieScheme");

exports.findAll = () => Movie.find().sort({ createdAt: -1 });

exports.findById = (id) => Movie.findById(id);

exports.create = (movie) => Movie.create(movie);

exports.update = (id, movie) => Movie.findByIdAndUpdate(id, movie, { new: true , runValidators: true });

exports.delete = (id) => Movie.findByIdAndDelete(id);