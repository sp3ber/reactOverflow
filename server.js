const express = require('express');
const path = require('path');
const staticPath = path.join(__dirname, '/public');
const bodyParser = require('body-parser');


const user = {
  username: 'miha',
  password: 'super'
};
const app = express();

app.use(bodyParser.json());
app.use(express.static(staticPath));
app.get('/answers', function(req, res){
  res.json(user);
});

app.get('*', function (req, res) {
  res.sendFile(path.join(staticPath, '/index.html'))
});


app.listen(3000, function(){
  console.log('app at 3000');
});