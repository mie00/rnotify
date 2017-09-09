module.exports = function(cfg) {
    const Promise = require('bluebird');
    const nodemailer = require('nodemailer');
    var transporter = Promise.promisifyAll(nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: cfg.email,
            pass: cfg.password,
        }
    }));
    return {
        send: function(title, msg, to) {
            let mailOptions = {
                from: (cfg.from?'"' + cfg.from + '" ':'') + ('<' + cfg.email + '>'),
                to: to,
                subject: '',
                text: msg,
            };
            return transporter.sendMailAsync(mailOptions);
        },
    };
};
