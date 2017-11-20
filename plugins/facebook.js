const errors = require('../utils/errors');
const login = require("facebook-chat-api");
const Promise = require('bluebird');

module.exports = function(cfg) {
    return new Promise((resolve, reject) => {
        login({email: cfg.login, password: cfg.password}, (err, api) => {
            if (err)
                return reject(err);
            return resolve({
                send: (title, msg, to) => new Promise((resolve, reject) => {
                    if (to.match(/^[0-9]+$/)) {
                        return api.sendMessage(title?`${title}\n${msg}`:msg, to, (err) => {
                            if (err)
                                return reject(err);
                            resolve();
                        })
                    } else {
                        return api.getUserID(to, (err, data) => {
                            if (err)
                                return reject(err);
                            if (!data || !data.length)
                                return reject(new errors.UsernameNotFoundException(`Username ${to} is not found`));
                            console.log(data);
                            return api.sendMessage(title?`${title}\n${msg}`:msg, data[0].userID, (err) => {
                                if (err)
                                    return reject(err);
                                resolve();
                            })
                        });
                    }

                }),
            });
        });
    });
};
