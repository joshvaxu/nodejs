var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var request = require('request');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false});

var URLContext = 'http://172.16.51.196:8080/myapp/';

app.use(express.static('bootstrap-3.3.7'));
app.use(express.static('plan1'));
app.use(bodyParser.urlencoded({ extended : false}));
app.use(multer({ dest: '/tmp/'}).array('image'));

var users = JSON.parse(fs.readFileSync(__dirname + "/" + "users.json", "utf-8"));
console.log(users);

app.get('/search', function(req, res) {
	request({
		uri: URLContext + 'myresource'
	}).pipe(res);
});

app.get('/users', function(req, res) {
	request({uri: URLContext + 'smooth?id=' + req.query.id}).pipe(res);
});

app.get('/users/:username', function(req, res) {
	console.log('users/'+ req.params.username); 
	request({
		uri: URLContext + 'users/names/' + req.params.username
	}).pipe(res);
});

app.get('/listUsers', function(req, res) {
	request({
		uri: URLContext + 'users/list/'
	}).pipe(res);
});

app.get('/process', function(req, res) {
	// print JSON Format
	response = {
		first_name:req.query.first_name,
		last_name:req.query.last_name
	};
	console.log("get");
	console.log(response);
	res.end(JSON.stringify(response));
});

app.get("/deleteUser", function(req, res) {
	var id = 4;
	delete users["user" + id];
	console.log(users);
	res.end(JSON.stringify(users));
});

app.get('/:id', function(req, res) {
	var user = users["user" + req.params.id];
	console.log(user);
	res.end(JSON.stringify(user));
});

app.post("/addUser", function(req, res) {
	console.log("/addUser");

	var formData = {
		name : req.body.first_name + " " + req.body.last_name,
		password : req.body.password,
		profession : req.body.profession
	};

	request.post(URLContext + 'users',
		{form: { name : req.body.first_name + " " + req.body.last_name,
				password : req.body.password,
				profession : req.body.profession
				}
		}).pipe(res);
});

app.post('/process', urlencodedParser, function(req, res) {
	
	// print JSON Format
	response = {
		first_name:req.body.first_name,
		last_name:req.body.last_name
	};
	console.log("post");
	console.log(response);
	res.end(JSON.stringify(response));
});

app.post('/file_upload', function(req, res) {
	console.log(req.files[0]); // upload file info

	var dest_file = __dirname + "/" + req.files[0].originalname;
	fs.readFile(req.files[0].path, function(err, data){
		fs.writeFile(dest_file, data, function(err) {
			if (err) {
				console.log(err);
			} else {
				response = {
					message:'File upload successfully',
					filename:req.files[0].orginalname
				};
			}
			console.log(response);
			res.end(JSON.stringify(response));
		});
	});
});

var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("app instance, access URL is http://%s:%s", host, port);
});
