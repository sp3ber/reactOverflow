const express = require('express');
const request = require('request-promise');

const router = express.Router();
const getQueryUrl = (title) => {
  const urifiedTitle = encodeURIComponent(title);
  return `http://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&site=stackoverflow&q=${urifiedTitle}`;
};
const defaultOptions = {
  method: 'GET',
  json: true,
  gzip: true
};
const simpleCache = {};

router.get('/questions', function(req, res){
  const titleParam = req.query.title;
  if (!isTitleQueryValid(titleParam)) {
    return res.json({
      success: false,
      error: 'Invalid query param'
    })
  }
  const options = Object.assign({}, defaultOptions, {
    uri: getQueryUrl(titleParam.trim())
  });
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
        error: 'Stack api is not available'
      })
    });
});

function isTitleQueryValid (title) {
  return typeof title == 'string' && title.trim().length;
}

module.exports = router;