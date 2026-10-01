// src/controllers/movieController.js
import service from '../services/movieService.js';
import crypto from 'crypto';    
import WatchRequest from '../models/watchRequestSchema.js';     
import Movie from '../models/movieScheme.js';

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

export const requestWatch = async (req, res, next) => {
  try {
    const { movieId } = req.body;

    if (!movieId) {
      return res.status(400).json({
        success: false,
        error: 'movieId လိုအပ်တယ်',
      });
    }

    // ObjectId format စစ်
    if (!Movie.base.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        success: false,
        error: 'Movie ID ပုံစံ မှားနေတယ်',
      });
    }

    // Movie ရှိလား စစ်
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie မရှိပါ',
      });
    }

    // Token generate (32 chars)
    const token = crypto.randomBytes(16).toString('hex');

    // DB ထဲ သိမ်း (10 min TTL)
    await WatchRequest.create({ token, movieId });

    // Deep link
    const botUsername = process.env.BOT_USERNAME || 'YourBotUsername';
    const deepLink = `https://t.me/${botUsername}?start=${token}`;

    res.json({
      success: true,
      deepLink,
      token,
      movieName: movie.name,
    });
  } catch (err) {
    next(err);
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
  requestWatch
};

export default movieController;