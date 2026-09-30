// src/services/movieService.js
import repo from '../repositories/movieRepository.js';
import ApiError from '../utils/ApiError.js';
import { sendMovie } from '../bot.js';   


export const getById = async (id) => {
  const movie = await repo.findById(id);
  if (!movie) {
    throw new ApiError(404, 'Movie not found');
  }
  return movie;
};

export const create = async ({ name, tmdbId, fileId }) => {
  if (!fileId && !tmdbId) {
    throw new ApiError(400, 'FileId or TmdbId is required');
  }
  return repo.create({ name, tmdbId, fileId });
};

export const getMovie = async () => {
  const movies = await repo.findAll();
  return movies;   // empty array က error မဟုတ်
};

export const updateMovie = async (id, { name, tmdbId, fileId }) => {
  const movie = await repo.update(id, { name, tmdbId, fileId });
  if (!movie) {
    throw new ApiError(404, 'Movie not found');
  }
  return movie;
};

export const deleteMovie = async (id) => {
  const movie = await repo.deleteById(id);   // deleteById
  if (!movie) {
    throw new ApiError(404, 'Movie not found');
  }
  return movie;
};

// ═══════════════════════════════════════════
// User ဆီ ဇာတ်ကားပို့ခြင်း
// ═══════════════════════════════════════════

export const sendMovieToUser = async ({ telegramId, movieId }) => {
  if (!telegramId || !movieId) {
    throw new ApiError(400, 'telegramId နဲ့ movieId လိုအပ်တယ်');
  }

  const movie = await repo.findById(movieId);
  if (!movie) {
    throw new ApiError(404, 'Movie မရှိပါ');
  }

  // ⬇️⬇️⬇️ ဒါ ထည့် ⬇️⬇️⬇️
  console.log('🔍 DEBUG:');
  console.log('   telegramId:', telegramId);
  console.log('   movieName:', movie.name);
  console.log('   fileId:', movie.fileId?.substring(0, 30) + '...');
  // ⬆️⬆️⬆️

  try {
    await sendMovie(telegramId, movie.fileId, movie.name);
    console.log('✅ Video sent!');
  } catch (err) {
    console.error('❌ sendMovie FAILED:');
    console.error('   message:', err.message);
    console.error('   response:', JSON.stringify(err.response?.body, null, 2));
    console.error('   error_code:', err.response?.error_code);
    console.error('   description:', err.response?.description);

    if (err.message === 'BOT_BLOCKED') {
      throw new ApiError(400, 'Bot ကို block ထားပါတယ်');
    }
    throw new ApiError(500, `Video ပို့မရပါ: ${err.message}`);
  }

  return { movie: movie.name, status: 'sent' };
};

// ═══════════════════════════════════════════
// Default export (routes က ဒါ ခေါ်နေတယ်)
// ═══════════════════════════════════════════

const movieService = {
  getById,
  create,
  getMovie,
  updateMovie,
  deleteMovie,
  sendMovieToUser,
};

export default movieService;