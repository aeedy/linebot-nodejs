var express = require('express');
var mongoose = require("mongoose");
const line = require('@line/bot-sdk');
const middleware = require('@line/bot-sdk').middleware;
require('dotenv').config();
const request = require('request')
const fs = require('fs');
const {promisify} = require('util');

const reply_route = express.Router();
const cors = require('cors');

const actionReply = require('../actions/reply_text.js');
const actionMessage = require('../actions/reply_message.js');

reply_route.post('/text', cors(), actionReply.replyText);
reply_route.post('/message', cors(), actionMessage.replyMessage);

module.exports = reply_route;