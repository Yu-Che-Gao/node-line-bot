const CHANNEL_ID = '1476981144';
const CHANNEL_SECRECT = 'fcd097f1c98ef66af13341fc8b7f7f4a';
const MID = 'u93e310868fe8f27049eec00dea8d3751';
const LINE_API = 'https://api.line.me/v1/events';
const request = require('request');
var customRequest = request.defaults({ 'proxy': process.env.FIXIE_URL });

exports.sendTextMessage = function sendTextMessage(sender, text) {

  const data = {
    to: [sender],
    toChannel: 1476981144,
    eventType: '138311608800106203',
    content: {
      contentType: 1,
      toType: 1,
      text: text
    }
  };

  console.log('send: ', data);

  customRequest({
    url: LINE_API,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Line-ChannelID': CHANNEL_ID,
      'X-Line-ChannelSecret': CHANNEL_SECRECT,
      'X-Line-Trusted-User-With-ACL': MID
    },
    method: 'POST',
    body: JSON.stringify(data)
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
    console.log('send response: ', body);
  });
}