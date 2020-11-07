var mongoose = require("mongoose");
const line = require('@line/bot-sdk');
const middleware = require('@line/bot-sdk').middleware;
require('dotenv').config();
const request = require('request')
const fs = require('fs');
const {promisify} = require('util');

const client = new line.Client({
    channelAccessToken: '8NV2ADjSDzRv9ydVQore/QCJfepyW2VOMDENeXfKT/hvIGI3VoYbTxkgX/hzurT6Jd9IX0q8TuSV8Du6UEig7SUrTo6g/azl/aTdsbCQSsG2TczPV7tUm5wEohikkMoYFneBxDv4oDyj6pfrJXBiRAdB04t89/1O/w1cDnyilFU='
});

const replyMessage = function(req, res, next) {

    console.log(req.body.events);

    /*
    const message = {
        type: 'text',
        text: 'Hello World!'
      };

      client.replyMessage('<replyToken>', message)
        .then(() => {
            ...
        })
        .catch((err) => {
            // error handling
        });

    res.sendStatus(200);

    */
}

module.exports = {
    replyMessage
}