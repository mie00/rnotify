module.exports = function(cfg) {
    const TelegramBot = require('node-telegram-bot-api');
    const bot = new TelegramBot(cfg.token, {polling: false});
    return {
        send: function(title, msg, to) {
            return bot.sendMessage(to, title)
                .then(_ => bot.sendMessage(to, msg));
        },
    };
};
