var mongoose = require("mongoose");
const line = require('@line/bot-sdk');
const middleware = require('@line/bot-sdk').middleware;
require('dotenv').config();
const request = require('request')
const fs = require('fs');
const {promisify} = require('util');
const {A,B} = require('../libs/helper_module');

const replyText = function(req, res, next) {
    console.log(A(1,2));
    console.log(req.body);
    res.sendStatus(200);
}

module.exports = {
    replyText
}