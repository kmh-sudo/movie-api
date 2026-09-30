import Movie from '../models/movieScheme.js';

const movieRepository = {
  findAll: () => Movie.find().sort({ createdAt: -1 }),

  findById: (id) => Movie.findById(id),

  create: (movie) => Movie.create(movie),

  update: (id, movie) =>
    Movie.findByIdAndUpdate(id, movie, { new: true, runValidators: true }),

  deleteById: (id) => Movie.findByIdAndDelete(id),

  count: () => Movie.countDocuments(),
};

export default movieRepository;   // ⬅️ default export