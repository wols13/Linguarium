var name = "Default";

function updateScroll(){
    var element = document.getElementById("past-messages");
    element.scrollTop = element.scrollHeight;
}

function updateUserList(data){
	var user_list = "";
	for (var i = 0; i < data.length; i++){
		user_list += "<p class='user_list_item'><i class='fa fa-circle online-icon' aria-hidden='true'></i>" + data[i] + "</p>";
	}
	$("#userlist-inner").empty();
	$("#userlist-inner").append(user_list);
}

window.onload = function(){
	if (location.hostname === "localhost") {
		var socket = io.connect()
	} else {
		var socket = io.connect(window.location.hostname);
	}

	// Handling incoming text message
	socket.on('text_message', function(data){
		var new_message = "<span class='not_my_message'><span class='message_sender'>" + data.user + ": </span>" +  data.message + "</span><br>";
		$("#past-messages").append(new_message);
		updateScroll();
	});
	
	socket.on('user_connected', function(data) {
		updateUserList(data);
	});

	socket.on('user_disconnected', function(data) {
		updateUserList(data);
	});

	// Handling event when user clicks enter to send text message
	$("#new-message").keypress(function(e){
		if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
		if (keyCode == '13'){
				// Send the text, clear input field and update message buble
				var new_message = $("#new-message").val();
				if (new_message.length > 0){
					socket.emit('text_message', {user: name, message: new_message});

					$("#new-message").val('');
					new_message = "<span class='my_message'>" + new_message + "</span><br>";
					$("#past-messages").append(new_message);
					updateScroll();
				}
				return false;
		}
	});

	//User disconnected, send signal for disconnect
	$(window).on("beforeunload", function() {
		socket.emit('user_disconnected', {user: name});
	});

	name = prompt("Please enter your name", "");
	socket.emit('user_connected', {user: name});
}