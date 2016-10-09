const express = require('express');
const request = require('request-promise');

const router = express.Router();
const answers = ['hello' , 'world'];
const options = {
  method: 'GET',
  uri: 'http://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&site=stackoverflow&q=indexRoute',
  //uri: 'http://api.petfinder.com/my.method?key=12345&arg1=foo&token=67890&sig=abcdef',
  json: true,
  gzip: true
};
const simpleCache = {};

router.get('/answers', function(req, res){
  console.log(req.query.title);
  request(options)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (err) {
      // Something bad happened, handle the error
      console.log('there is error');
    });
});

module.exports = router;