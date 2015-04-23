'use strict';

var express = require('express'),
  fs = require('fs'),
  path = require('path'),
  url = require('url');


var app = express();
var INDEX_HTML = fs.readFileSync(path.join(__dirname, 'app/index.html'), 'utf-8');
var ACCEPTABLE_URLS = ['/', '/first/page', '/second/page'];


app.use(function(req, res, next) {
  var parts = url.parse(req.url);
  for (var i = 0; i < ACCEPTABLE_URLS.length; i++) {
    if (parts.pathname.indexOf(ACCEPTABLE_URLS[i]) === 0) {
      return res.status(200).send(INDEX_HTML);
    }
  }
  return next();
});


var port = process.env.PORT || 8000;
app.listen(port);
console.log('Please go to http://localhost:' + port);
