// src/tests/movieService.test.js
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { sendMovieToUser } from '../services/movieService.js';
import movieRepository from '../repositories/movieRepository.js';
import { sendMovie } from '../bot.js';

// ✅ Vitest မှာ ရိုးရိုး vi.mock() ပဲ ရ
vi.mock('../repositories/movieRepository.js', () => ({
  default: {
    findById: vi.fn(),
    findAll: vi.fn(),
  },
}));

vi.mock('../bot.js', () => ({
  sendMovie: vi.fn(),
}));

describe('sendMovieToUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('movie မရှိရင် error ပစ်', async () => {
    movieRepository.findById.mockResolvedValue(null);

    await expect(
      sendMovieToUser({ telegramId: '123', movieId: 'abc' })
    ).rejects.toThrow('Movie မရှိပါ');
  });

  test('movie ရှိရင် video ပို့', async () => {
    movieRepository.findById.mockResolvedValue({
      _id: 'abc',
      name: 'Inception',
      fileId: 'BAACAgIAAx...',
    });
    sendMovie.mockResolvedValue({ success: true });

    const result = await sendMovieToUser({
      telegramId: '123',
      movieId: 'abc',
    });

    expect(sendMovie).toHaveBeenCalledWith('123', 'BAACAgIAAx...', 'Inception');
    expect(result.status).toBe('sent');
  });
});