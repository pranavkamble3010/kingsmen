var express = require('express');
var router = express.Router();

//import fetch api for API call
const fetch = require('node-fetch');

//import config
var config = require('../config')

var apiUrl = config.getUrl();

router.get('/', function(req, res, next) {

    fetch(apiUrl+'/getstats')
    .then(res => res.text())
    .then(result=>saveData(result))
    .catch(er => next())
    
  
    saveData = function(data){
      //console.log(data);
      res.send(data);
    }
  
  });

module.exports = router;