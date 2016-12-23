var express = require('express');
var app = express();

// root-- print "hello world"
app.get('/', function(req, res) {
	console.log("default get request");
	res.send('Hello GET');
});

// POST 
app.post('/', function(req, res) {
	console.log("default post request");
	res.send("Hello POST");
});

// /del_user
app.get('/del_user', function(req, res) {
	console.log("/del_user response DELETE request");
	res.send('Delete user');
});

// /list_user
app.get('/list_user', function(req, res) {
	console.log("/list_user GET request");
	res.send("list user");
});

// /abcd, abxcd, ab123cd GET
app.get('/ab*cd', function(req, res) {
	console.log("/ab*cd GET request");
	res.send("Regex");
});

var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("app Instance. access URL is http://%s:%s", host, port);
});

