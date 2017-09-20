const express = require('express');
const path = require('path');

const staticPath = path.join(__dirname, '/public');
const bodyParser = require('body-parser');
const apiRouter = require('./api');

const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(staticPath));

app.use('/api', apiRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, '/index.html'));
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
