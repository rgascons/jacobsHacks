var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();


http.createServer(app).listen(8081, function(){
    console.log('Listening on port 8080');
});