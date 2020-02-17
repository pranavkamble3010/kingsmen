var express = require('express');
var router = express.Router();

//import fetch api for API call
const fetch = require('node-fetch');

var savedData = {}
saveData = function(data){
  savedData = data;
}

/* GET home page. */
router.get('/', function(req, res, next) {

  fetch('http://35.225.148.249:1880/getall')
  .then(res => res.text())
  .then(result=>saveData(result))

  res.render('dashboard', { data : savedData.toString()});
});

module.exports = router;
