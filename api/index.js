const express = require('express');
const request = require('request-promise');

const router = express.Router();
const API_URL = 'http://api.stackexchange.com/2.2/search';
const defaultOptions = {
  method: 'GET',
  json: true,
  gzip: true,
  uri: API_URL
};
const defaultQueryOptions = {
  order: "desc",
  sort: "relevance",
  site: "stackoverflow"
};
const simpleCache = {};

router.get('/questions', function(req, res){
  const queryParams = req.query;
  const options = Object.assign({}, defaultOptions);
  options.qs = Object.assign({}, defaultQueryOptions, queryParams);

  let cacheKey = JSON.stringify(options);
  if (simpleCache[cacheKey]) {
    return res.json(simpleCache[cacheKey]);
  }
  request(options)
    .then(function (response) {
      simpleCache[cacheKey] = response;
      return res.json(response);
    })
    .catch(function (err) {
      // Something bad happened, handle the error
      console.log(err);
      return res.json({
        success: false,
        error: 'Stack api is not available',
        err
      })
    });
});

function isTitleQueryValid (title) {
  return typeof title == 'string' && title.trim().length;
}

module.exports = router;