const express = require('express');
const request = require('request-promise');

const router = express.Router();
const API_URL = 'http://api.stackexchange.com/2.2/search';
const PROXY_SERVER = 'http://128.199.91.174:8080'; // for testing, SO blocking ip with many requests
const defaultOptions = {
  method: 'GET',
  //proxy: PROXY_SERVER,
  json: true,
  gzip: true,
  uri: API_URL
};
const defaultQueryParams = {
  order: 'desc',
  sort: 'relevance',
  site: 'stackoverflow'
};
const RUSSIAN_SITE = 'ru.stackoverflow';
const simpleCache = {};

router.get('/questions', function(req, res){
  const queryParams = req.query;
  const options = Object.assign({}, defaultOptions);
  options.qs = Object.assign({}, defaultQueryParams, queryParams);
  if (isRussianQuery(queryParams.intitle)) {
    options.qs.site = RUSSIAN_SITE;
  }

  const cacheKey = JSON.stringify(options);
  if (simpleCache[cacheKey]) {
    return res.json(simpleCache[cacheKey]);
  }
  request(options)
    .then(function (response) {
      simpleCache[cacheKey] = response;
      return res.json(response);
    })
    .catch((err) => (errHandler(err, res)));
});

function errHandler(err, res) {
  console.log(err);
  return res
    .status(503)
    .json({
      error: 'Stack api is not available',
      err
    })
}
function isRussianQuery(query) {
  if (typeof query === 'string') {
    return /[а-я]/i.test(decodeURI(query));
  }
  return false;
}

module.exports = router;