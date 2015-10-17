var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var config = require('./config');
var app = express();

var braintree = require("braintree");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: config.merchantId,
    publicKey: config.publicKey,
    privateKey: config.privateKey
});


http.createServer(app).listen(8080, function(){
    console.log('Listening on port 8080');
});