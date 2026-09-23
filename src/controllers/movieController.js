const service = require("../services/movieService");

exports.create = async (req, res, next) => {
  try {
    const movie = await service.create(req.body);
    res.status(201).json({ success: true, data: movie });
  } catch (error) {
    next(error);
  }
}

exports.getMovie = async (req, res, next) => {
  try {
    const movie = await service.getMovie();
    res.status(200).json({ success: true, data: movie });
  } catch (error) {
      next(error);  
  }
}

exports.getMovieById = async (req, res, next) => {
  try {
    const movie = await service.getById(req.params.id);
    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    next(error);
  }
}

