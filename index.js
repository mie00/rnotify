const Promise = require('bluebird');
Promise.config({
    cancellation: true,
});
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

module.exports = function(cfg) {
    return fs.readdirAsync(path.join(__dirname, 'plugins'))
        .filter(f => f.endsWith('.js'))
        .map(f => {
            var name = f.substr(0, f.length - '.js'.length);
            if (!cfg[name]) return;
            var m = require('./' + path.join('plugins', f));
            return Promise.resolve(m(cfg[name]))
                .then(mm => {
                    mm.name = name;
                    return mm;
                });
        })
        .filter((x) => (x))
        .then(l => {
            var plugins = {};
            for (var e of l) {
                plugins[e.name] = e;
            }
            var send = function(title, message, args) {
                return Promise.resolve(plugins)
                    .then(p => Object.keys(p))
                    .map(k => plugins[k])
                    .filter(v => v.send && args[v.name])
                    .map(v => {
                        return Promise.resolve(args[v.name])
                            .map(c => v.send(title, message, c));
                    });
            };
            plugins.send = send;
            return plugins;
        });
};
