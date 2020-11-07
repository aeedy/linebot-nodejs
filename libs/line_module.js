var mongoose = require("mongoose");
const line = require('@line/bot-sdk');
require('dotenv').config();
const fs = require('fs');
const {promisify} = require('util');

const client = new line.Client({
    channelAccessToken: '8NV2ADjSDzRv9ydVQore/QCJfepyW2VOMDENeXfKT/hvIGI3VoYbTxkgX/hzurT6Jd9IX0q8TuSV8Du6UEig7SUrTo6g/azl/aTdsbCQSsG2TczPV7tUm5wEohikkMoYFneBxDv4oDyj6pfrJXBiRAdB04t89/1O/w1cDnyilFU='
});

const replyMessage = (replyToken,text) => {

    const message = {
        type: 'text',
        text: 'Reply Hello World!'
      };

      const message1 = {
        "type": "flex",
        "altText": "this is a flex message",
        "contents": {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "hello"
              },
              {
                "type": "text",
                "text": "world"
              }
            ]
          }
        }
      }

      let flex_msg = {
        "replyToken": replyToken,
        "messages": [
            message1
        ]
      }

      let data2 = JSON.stringify(flex_msg, null, 2);
        fs.writeFile(`./data/mock-3.json`, data2, (err) => {
        if (err) throw err;
        console.log('Data written to file');
        });
      
      client.replyMessage(replyToken, flex_msg)
        .then(() => {
          console.log("send success")
        })
        .catch((err) => {
            console.log("send fail")
        });

    return true;
}

const pushMessage = (to,message) => {
    const message1 = {
        type: 'text',
        text: 'Push Hello World!'
      };
      
      client.pushMessage(to, message1)
        .then(() => {
          console.log("send success")
        })
        .catch((err) => {
            console.log("send fail")
        });

    return true;
}

module.exports = {
    replyMessage,
    pushMessage
}