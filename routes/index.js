var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
/* GET home page. */
router.get('/', function(req, res, next) {
 // res.render('index', { title: 'Express' });

  var mongo_uri = "mongodb://aeedymongo:Km$3Nbs<!22@ds033175.mlab.com:33175/aeedybot";
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

  res.sendStatus(200);
});

router.post('/webhook', function(req, res, next) {
  res.sendStatus(200);

});

module.exports = router;
