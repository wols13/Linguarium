if (location.hostname === "localhost") {
	var socket = io.connect()
} else {
	var socket = io.connect(window.location.hostname);
}
