const Promise = require('bluebird');
Promise.config({
    cancellation: true,
});
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

module.exports = function(cfg) {
    return fs.readdirAsync('./plugins')
        .filter(f => f.endsWith('.js'))
        .map(f => {
            var name = f.substr(0, f.length - '.js'.length);
            var m = require('./' + path.join('plugins', f));
            mm = m(cfg[name]);
            mm.name = name;
            return mm;
        })
        .then(l => {
            var plugins = {};
            for (var e of l) {
                plugins[e.name] = e;
            }
            // TODO: Find a better way to implement a global send
            // var send = function() {
            //     return Promise.resolve(plugins)
            //         .then(p => Object.keys(p))
            //         .map(k => plugins[k])
            //         .filter(v => v.send)
            //         .map(v => v.send.apply(v, arguments));
            // };
            // plugins.send = send;
            return plugins;
        });
};
