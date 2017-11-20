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
    {
        "from": "TWILIO_PHONE_NUMBER",
        "accountSid": "TWILIO_ACCOUNT_SID",
        "authToken": "TWILIO_AUTH_TOCKEN"
    },
}).then(p => {
    p.telegram.send('Title', 'message', 'TARGET_ID'); //you can get it by sending /getid to @myidbot
    p.send('Title', 'Hello', {
        telegram: ['TARGET_ID'],
        gmail: ['TARGET_EMAIL'],
        twilio: ['TARGET_PHONE_NUMBER'],
    });
});
