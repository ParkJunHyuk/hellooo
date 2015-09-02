var express = require("express");
var app = express();
var server = require("http").createServer(app);
var bodyParser = require("body-parser");
var path = require("path");
var mongo = require("mongodb");
var ObjectID = require("mongodb").ObjectID;

var config = {
	port : 9000,
	ip : "localhost",
	root : "./"
};

var mongoServer = new mongo.Server("localhost", 27017, {auto_reconnect: true});
var db = new mongo.Db("test", mongoServer);

db.open(function (err, db) {
	if(!err) {
		console.log("connected to 'test' database");
	}
});

app.use(bodyParser.json());
app.use(express.static(path.join(config.root)));

app.get('/api/dashboard', function (req, res) {
	db.collection("dashboard", function (err, collection) {
		collection.findOne({'_id': new ObjectID.createFromHexString("55e2b3e4d3f6dad972ef5fcb")}, function (err, dashboard) {
			res.status(200).json(dashboard);
		})
	})
})

app.post('/api/dashboard', function (req, res) {
	db.collection("dashboard", function (err, collection) {
		collection.update({'_id': new ObjectID.createFromHexString("55e2b3e4d3f6dad972ef5fcb")}, req.body, {safe: true}, function (err, result) {
			if(err) {
				res.status(500).json({'msg': 'error'});			
			} else {
				res.status(200).json({'msg': 'success'});			
			}
		})
	})
})

app.route("/*")
	.get(function (req, res) {
		res.sendFile(path.resolve(app.get('appPath')+'/index.html'));
	});

server.listen(config.port, config.ip, function () {
	console.log("Server Started");
})