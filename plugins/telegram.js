module.exports = function(cfg) {
    const TelegramBot = require('node-telegram-bot-api');
    const bot = new TelegramBot(cfg.token, {polling: true});
    return {
        send: function(to, msg) {
            bot.sendMessage(to, msg);
        },
    };
};
