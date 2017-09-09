var rnotify = require('./index');

rnotify({
    telegram: {
        token: 'TELEGRAM_TOKEN',
    },
    gmail: {
        email: 'YOUR_EMAIL',
        password: 'YOUR_PASSWORD',
        from: 'YOUR_NAME',
    },
}).then(p => {
    p.telegram.send('Title', 'message', 'TARGET_ID'); //you can get it by sending /getid to @myidbot
    p.send('Title', 'Hello', {
        telegram: ['TARGET_ID'],
        gmail: ['TARGET_EMAIL'],
    });
});
