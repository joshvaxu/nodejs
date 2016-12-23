// require events module
var events = require("events");

// create eventEmitter instance
var eventEmitter = new events.EventEmitter();

// create event handler
var connectionHandler = function connected() {
	console.log('connected.');

	// emit data_received event
	eventEmitter.emit("data_received");
}

// bind connected event handler
eventEmitter.on('connection', connectionHandler);

// bind data_received event handler
eventEmitter.on('data_received', function() {
	console.log('data received');
});

// emit connction event
eventEmitter.emit('connection');

console.log("The end!");

