var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
const line = require('@line/bot-sdk');
const middleware = require('@line/bot-sdk').middleware;

const request = require('request')

const config = {
  channelAccessToken: '',
  channelSecret: ''
};

const client = new line.Client(config);
const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_MESSAGING_PUSH = 'https://api.line.me/v2/bot/message/push';
const LINE_MESSAGING_REPLY = 'https://api.line.me/v2/bot/message/reply';

/* GET home page. */
router.get('/', function(req, res, next) {
 // res.render('index', { title: 'Express' });

  var mongo_uri = "";
  mongoose.Promise = global.Promise;
  mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(
    () => {
      console.log("[success] task 2 : connected to the database ");
    },
    error => {
      console.log("[failed] task 2 " + error);
      process.exit();
    }
  );

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  var Schema = mongoose.Schema;

  var UsersSchema = new Schema({
    FirstName: String,
    LastName: String
  });

  var Users = mongoose.model('Users', UsersSchema );
  const testUsers = new Users({
    FirstName: 'The Forest Hiker',
    LastName: 'Test Test'
  });

  testUsers
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log(err);
  });

  res.sendStatus(200);
});

router.post('/push',function(req,res,next){
  return push_Text('xxxxx');
});

router.post('/webhook', function(req, res, next) {

  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }

  //res.sendStatus(200);
  /*
  var text = req.body.events[0].message.text
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken
  console.log(text, sender, replyToken)
  console.log(typeof sender, typeof text)
  console.log(req.body.events[0])

  return reply_Text(text,replyToken);
  */
 //console.log(req.body.events)
 handleEvent2(req.body.events);

});

function push_Text(text) {
  let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+config.channelAccessToken
  }
  let body = JSON.stringify({
      to: 'Uc5c60cb6b8ceb2455d1b6860238f82b5',
      messages: [{
          type: 'text',
          text: 'Hellommmmmmm'
      }]
  })
  return request.post({
      url: 'https://api.line.me/v2/bot/message/push',
      headers: headers,
      body: body
  }, (err, res, body) => {
      console.log('status = ' + res.statusCode);
  });
}



function reply_Text(text,reply_token) {
  let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+config.channelAccessToken
  }
  let body = JSON.stringify({
      replyToken: reply_token,
      messages: [{
          type: 'text',
          text: 'Hello'
      },
      {
          type: 'text',
          text: 'How are you?'
      },
      {
        type: 'text',
        text: text
      }]
  })
  request.post({
      url: 'https://api.line.me/v2/bot/message/reply',
      headers: headers,
      body: body
  }, (err, res, body) => {
      console.log('status = ' + res.statusCode);
  });
}


// simple reply function
const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: 'text', text }))
  );
};

function handleEvent2(event) {
  console.log(event[0]);s
  switch (event[0].type) {
    case 'message':
      const message = event[0].message;
      switch (message.type) {
        case 'text':
          return console.log(`Left: ${JSON.stringify(event)}`);
        case 'image':
          return console.log(`Left: ${JSON.stringify(event)}`);
        case 'video':
          return console.log(`Left: ${JSON.stringify(event)}`);
        case 'audio':
          return console.log(`Left: ${JSON.stringify(event)}`);
        case 'location':
          return console.log(`Left: ${JSON.stringify(event)}`);
        case 'sticker':
          return console.log(`Left: ${JSON.stringify(event)}`);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }

    case 'follow':
      return console.log(`Left: ${JSON.stringify(event)}`);

    case 'unfollow':
      return console.log(`Left: ${JSON.stringify(event)}`);

    case 'join':
      return console.log(`Left: ${JSON.stringify(event)}`);

    case 'leave':
      return console.log(`Left: ${JSON.stringify(event)}`);

    case 'postback':
      let data = event.postback.data;
      return console.log(`Left: ${JSON.stringify(event)}`);

    case 'beacon':
      const dm = `${Buffer.from(event.beacon.dm || '', 'hex').toString('utf8')}`;
      return replyText(event.replyToken, `${event.beacon.type} beacon hwid : ${event.beacon.hwid} with device message = ${dm}`);

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}


// callback function to handle a single event
function handleEvent(event) {
  switch (event.type) {
    case 'message':
      const message = event.message;
      switch (message.type) {
        case 'text':
          return handleText(message, event.replyToken);
        case 'image':
          return handleImage(message, event.replyToken);
        case 'video':
          return handleVideo(message, event.replyToken);
        case 'audio':
          return handleAudio(message, event.replyToken);
        case 'location':
          return handleLocation(message, event.replyToken);
        case 'sticker':
          return handleSticker(message, event.replyToken);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }

    case 'follow':
      return replyText(event.replyToken, 'Got followed event');

    case 'unfollow':
      return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

    case 'join':
      return replyText(event.replyToken, `Joined ${event.source.type}`);

    case 'leave':
      return console.log(`Left: ${JSON.stringify(event)}`);

    case 'postback':
      let data = event.postback.data;
      return replyText(event.replyToken, `Got postback: ${data}`);

    case 'beacon':
      const dm = `${Buffer.from(event.beacon.dm || '', 'hex').toString('utf8')}`;
      return replyText(event.replyToken, `${event.beacon.type} beacon hwid : ${event.beacon.hwid} with device message = ${dm}`);

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

function handleText(message, replyToken) {
  return replyText(replyToken, message.text);
}

function handleImage(message, replyToken) {
  return replyText(replyToken, 'Got Image');
}

function handleVideo(message, replyToken) {
  return replyText(replyToken, 'Got Video');
}

function handleAudio(message, replyToken) {
  return replyText(replyToken, 'Got Audio');
}

function handleLocation(message, replyToken) {
  return replyText(replyToken, 'Got Location');
}

function handleSticker(message, replyToken) {
  return replyText(replyToken, 'Got Sticker');
}

module.exports = router;
