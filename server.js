var express = require('express');
var path = require('path');
var app = express();

var route = require('./app/route')

app.use('/api', route)

app.use(require('prerender-node').set('prerenderToken', 'f19Nv33JiyRHohMLi1uV'));

app.use('/static', express.static(__dirname + '/dist/static'));

app.get('/', function (req, res) {
  var haswww  = '';
  if (req.headers.host) {
    haswww = req.headers.host.match(/^www\./);
  }
  var url = req.protocol + '://' + req.get('host').replace(/www\./, '') + req.originalUrl;
  if (haswww) {
    res.redirect(301, url);
  } else {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
  }
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});
