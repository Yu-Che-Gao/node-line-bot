const express = require('express');
const bodyParser = require('body-parser');
const request=require('request');
const app = express();
const lineBotLib = require('./line-bot-lib.js');
const port = process.env.PORT || 80;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => { res.send('you have no right to access this page.') });
app.post('/callback', (req, res) => {
    const result = req.body.result;
    for (let i = 0; i < result.length; i++) {
        const data = result[i]['content'];
        console.log('receive: ', data);
        lineBotLib.sendTextMessage(data.from, '已接收到您傳送的訊息: ' + data.text);
    }
});

app.listen(port, () => { console.log('listening on port ' + port) });