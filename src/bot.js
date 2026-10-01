import { Telegraf } from "telegraf";
import Movie from "./models/movieScheme.js"
import WatchRequest from './models/watchRequestSchema.js';

export const bot = new Telegraf(process.env.BOT_TOKEN);

// start
bot.start(async (ctx) => {
  const payload = ctx.startPayload;   // /start TOKEN ရဲ့ TOKEN အပိုင်း
  const userId = ctx.from.id;
  const firstName = ctx.from.first_name;

  // Payload မပါရင် — ရိုးရိုး welcome
  if (!payload) {   
    return ctx.reply(
      `👋 မင်္ဂလာပါ ${firstName}!\n\n` +
      `🎬 ဇာတ်ကားကြည့်ဖို့ Website ကနေ card ကို နှိပ်ပါ။\n\n` +
      `သင့် Telegram ID: <code>${userId}</code>`,
      { parse_mode: 'HTML' }
    );
  }

  // Payload ပါရင် — token ရှာ
  try {
    const request = await WatchRequest.findOne({
      token: payload,
      used: false,
    });

    if (!request) {
      return ctx.reply(
        '❌ Link သက်တမ်း ကုန်သွားပါပြီ။\n' +
        'Website ကနေ ပြန် နှိပ်ပါ။'
      );
    }

    // Movie ရှာ
    const movie = await Movie.findById(request.movieId);
    if (!movie) {
      return ctx.reply('❌ ဇာတ်ကား မရှိပါ');
    }

    // "ပို့နေပါပြီ" ပြ
    await ctx.reply(`🎬 <b>${movie.name}</b> ပို့နေပါပြီ...`, {
      parse_mode: 'HTML',
    });

    // Video ပို့
    await bot.telegram.sendVideo(userId, movie.fileId, {
      caption: `🎬 <b>${movie.name}</b>\n\nEnjoy! 🍿`,
      parse_mode: 'HTML',
    });

    // Token ကို used သတ်မှတ် (one-time use)
    request.used = true;
    await request.save();

    console.log(`✅ Sent "${movie.name}" to ${userId}`);
  } catch (err) {
    console.error('❌ bot.start error:', err.message);
    await ctx.reply('❌ Video ပို့မရပါ။ ပြန်ကြိုးစားပါ။');
  }
});

bot.on('channel_post', async (ctx) => {
  const msg = ctx.channelPost;
  if (!msg?.video) return;

  console.log('\n📹 ================================');
  console.log('   Caption :', msg.caption || '(none)');
  console.log('   Duration:', msg.video.duration, 'sec');
  console.log('   Size    :', (msg.video.file_size / 1024 / 1024).toFixed(2), 'MB');
  console.log('   file_id (full):');
  console.log(msg.video.file_id);
  console.log('   Length  :', msg.video.file_id.length, 'chars');
  console.log('   ================================\n');
});

export async function sendMovie(telegramId, fileId, movieName) {
    try {
    await bot.telegram.sendVideo(telegramId, fileId, {
      caption: ` <b>${movieName}</b>\n\nEnjoy! `,
      parse_mode: 'HTML',
    });
    return { success: true };
  } catch (err) {
    // User blocked the bot
    if (err.response?.error_code === 403) {
      throw new Error('BOT_BLOCKED');
    }
    throw err;
  }
}
