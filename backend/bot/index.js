import { Telegraf } from 'telegraf';

const bot = new Telegraf('7115341078:AAFB8IfxbHbF6Lr2FLYr76-N2Sq8jkaJ7XU');

bot.command('start', ctx => {
  ctx.reply('Click to play "Guess the Number"', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Play Game',
            web_app: { url: 'https://guess-the-number-game-lyart.vercel.app/' },
          },
        ],
      ],
    },
  });
});

bot.launch();
