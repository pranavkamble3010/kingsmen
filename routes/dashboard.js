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

  res.render('dashboard.ejs');
  // fetch(apiUrl+'/getall')
  // .then(res => res.text())
  // .then(result=>saveData(result))
  

  // saveData = function(data){
  //   savedData = JSON.parse(data);
  //   //console.log(data);
  //   res.render('dashboard.ejs', { data : savedData});
  // }

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

router.get('/getpage', function(req, res, next) {

  var pageNumber = req.query.page;
  var pageSize = req.query.size;
  fetch(apiUrl+'/getpage?page_num='+pageNumber+'&page_size='+pageSize)
  .then(res => res.text())
  .then(result=>saveData(result))
  .catch(er => console.error(er))
  

  saveData = function(data){
    console.log(data);
    var response = {"last_page":8105,data:JSON.parse(data)};
    res.send(response);
  }

});


//delete data
router.post('/delete', function(req, res) {

  var updateResult = {};
  var postJSON = req.body;
  //const obj = JSON.parse(postJSON);
  console.log(postJSON);

  fetch(apiUrl+'/delete?id='+req.body.id, {
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
  //get updated data from backend to ensure the data has been deleted
  fetch(apiUrl+'/getbyid?id='+data.id)
  .then(res => res.text())
  .then(result =>sendResponse(result))
  .catch(er => console.log(er))
})

function sendResponse(result){
  console.log(result);
  res.send(result);
}

});

module.exports = router;
