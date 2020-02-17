var express = require('express');
var router = express.Router();

//import fetch api for API call
const fetch = require('node-fetch');

//import config
var config = require('../config')

var savedData = {}

var apiUrl = config.getUrl();

/* GET home page. */
router.get('/', function(req, res, next) {

  fetch(apiUrl+'/getall')
  .then(res => res.text())
  .then(result=>saveData(result))
  

  saveData = function(data){
    savedData = JSON.parse(data);
    //console.log(data);
    res.render('dashboard.ejs', { data : savedData});
  }

});


/* GET table rows. */
router.get('/gettabledata', function(req, res, next) {

  fetch(apiUrl+'/getall')
  .then(res => res.text())
  .then(result=>saveData(result))
  

  saveData = function(data){
    savedData = JSON.parse(data);
    //console.log(data);
    res.send(savedData);
  }

});

//accept data to be updated and send the updated data in the response
router.post('/', function(req, res) {

  var updateResult = {};
  var postJSON = req.body;
  req.body.address = JSON.parse(postJSON.address);
  //const obj = JSON.parse(postJSON);
  console.log(postJSON);

  fetch(apiUrl+'/update?id='+req.body.id, {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(req.body),
})
.then((response) => response.json())
.then((data) => {
  console.log(data);
  data = data;
  //get updated data from backend to ensure the data has been updated
  fetch(apiUrl+'/getbyid?id='+data.id)
  .then(res => res.text())
  .then(result =>sendResponse(result))
})

function sendResponse(result){
  //console.log(updateResult);
  res.send(result);
}

  
});


router.get('/results', function(req, res, next) {

  fetch(apiUrl+'/getresults')
  .then(res => res.text())
  .then(result=>saveData(result))
  

  saveData = function(data){
    console.log(data);
    res.send(data);
  }

});

module.exports = router;
