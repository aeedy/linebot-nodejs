var mongoose = require("mongoose");
const line = require('@line/bot-sdk');
const middleware = require('@line/bot-sdk').middleware;
require('dotenv').config();
const request = require('request')
const fs = require('fs');
const {promisify} = require('util');


const replySticker = function(req, res, next) {
    res.sendStatus(200);
}

module.exports = {
    replySticker
}