var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require("path");


var config = {
	port: 9898,
	ip: 'localhost',
	root: './'
}


app.use(express.static(path.join(config.root)));


server.listen(config.port, config.ip, function () {
	console.log('Server started : http//:localhost:'+config.port);
})