var name = "";

function namePrompt() {
	name = prompt("Please enter your name", "");
}

if (location.hostname === "localhost") {
	var socket = io.connect()
} else {
	var socket = io.connect(window.location.hostname);
}
