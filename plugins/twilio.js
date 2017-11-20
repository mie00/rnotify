const errors = require('../utils/errors');
const twilio = require('twilio')

module.exports = function(cfg) {
    const client = twilio(cfg.accountSid, cfg.authToken);
    return {
        send: (title, message, to) => {
            return client.messages
                .create({
                    to: to,
                    from: cfg.from,
                    body: title?`${title}\n${message}`:message,
                })
        }
    }
};
