// src/models/WatchRequest.js
import mongoose from 'mongoose';

const watchRequestSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,   // ⬅️ 10 မိနစ် (600 စက္ကန့်) နောက် auto delete
  },
});

export default mongoose.model('WatchRequest', watchRequestSchema);