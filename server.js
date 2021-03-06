var express = require('express');
var path = require('path');
var app = express();

var route = require('./app/route')

app.use('/api', route)

app.use(require('prerender-node').set('prerenderToken', 'f19Nv33JiyRHohMLi1uV'));

app.use('/static', express.static(__dirname + '/dist/static'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
