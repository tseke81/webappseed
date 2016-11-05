var express = require('express');
var app = express();


app.use(express.static(__dirname + '/dist'));


var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Express listening at http://%s:%s', host, port);
});
