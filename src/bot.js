import { Telegraf } from "telegraf";

export const bot = new Telegraf(process.env.BOT_TOKEN);

// start
bot.start((ctx) => {
  ctx.reply(`မင်္ဂလာပါ ${ctx.from.first_name}!\n\n` +
      `ဇာတ်ကားကြည့်ဖို့ Website ကနေ ကြိုက်နှစ်သက်ရာ ဇာတ်ကား ရွေးချယ် နှိပ်ပါ။\n\n` +
      `သင့် Telegram ID: <code>${ctx.from.id}</code>`,
    { parse_mode: 'HTML' });
})

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
