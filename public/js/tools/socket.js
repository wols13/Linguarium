var name = "Default";

if (location.hostname === "localhost") {
	var socket = io.connect()
} else {
	var socket = io.connect(window.location.hostname);
}

function namePrompt() {
	name = prompt("Please enter your name", "");
	socket.emit('user_connected', {user: name});
}