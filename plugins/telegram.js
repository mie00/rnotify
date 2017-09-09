const errors = require('../utils/errors');

module.exports = function(cfg) {
    const TelegramBot = require('node-telegram-bot-api');
    const bot = new TelegramBot(cfg.token, {polling: false});
    return bot.getMe()
        .then(me => {
            return {
                send: function(title, msg, to) {
                    p = Promise.resolve();
                    if (title)
                        p = bot.sendMessage(to, title);
                    return p.then(_ => bot.sendMessage(to, msg))
                        .catch(e => {
                            if (e.code === 'ETELEGRAM' && e.response && e.response.statusCode == 400 &&
                                e.response.body && e.response.body.description === 'Bad Request: chat not found') {
                                throw new errors.RequiredAction("Telegram bots cannot initiate a conversation," +
                                                            " can you send any message to '@" + me.username + "' first?");
                            } else {
                                throw e;
                            }
                        });
                },
            };
    });
};
