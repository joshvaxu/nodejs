var http = require('http');

http.createServer(function(request, response) {

	// send HTTP Head
	// HTTP Status : 200 : OK
	// Content Type: text/plain
	response.writeHead(200, {'Content-Type':'text/plain'});

	// send response data "Hello World"
	response.end('Hello World\n');

}).listen(8888);

// print info to Console
console.log('server running at http://127.0.0.1:8888/');

