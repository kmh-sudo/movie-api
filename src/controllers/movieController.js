// src/controllers/movieController.js
import service from '../services/movieService.js';

// ═══════════════════════════════════════════
// Individual handlers (named export)
// ═══════════════════════════════════════════

export const create = async (req, res, next) => {
  try {
    const movie = await service.create(req.body);
    res.status(201).json({ success: true, data: movie });
  } catch (error) {
    next(error);
  }
};

export const getMovie = async (req, res, next) => {
  try {
    const movie = await service.getMovie();
    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    next(error);
  }
};

export const getMovieById = async (req, res, next) => {
  try {
    const movie = await service.getById(req.params.id);
    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const movie = await service.updateMovie(req.params.id, req.body);
    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    next(error);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const movie = await service.deleteMovie(req.params.id);
    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    next(error);
  }
};

export const watchMovie = async (req, res, next) => {
  try {
    const result = await service.sendMovieToUser(req.body);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// ═══════════════════════════════════════════
// Default export (route က ဒါ ခေါ်နေတယ်)
// ═══════════════════════════════════════════

const movieController = {
  create,
  getMovie,
  getMovieById,
  update,
  delete: deleteMovie,   //  route က `delete` ခေါ်ရင်
  deleteMovie,           // route က `deleteMovie` ခေါ်ရင်
  watchMovie,
};

export default movieController;