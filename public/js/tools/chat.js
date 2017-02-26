//Connect and add to userlist
socket.on('connect', function(){
	socket.emit('user_connected', {user: name});
	console.log(name + ' connected!');
});

//User disconnected, send signal for disconnect
socket.on('disconnect', function() {
	socket.emit('user_disconnected', {user: name});
	console.log('Disconnected!');
});


socket.on('user_connected', function(data) {
	console.log('Someone else connected!');
	var new_message = "<span class='not_my_message'>" + data.user + "has connected" + "</span><br>";
	$("#past-messages").append(new_message);
});

// Handling incoming text message
socket.on('text_message', function(data){
	var new_message = "<span class='not_my_message'>" + data.user + ": " +  data.message + "</span><br>";
	$("#past-messages").append(new_message);
});

// Handling event when user clicks enter to send text message
$("#new-message").keypress(function(e){
	if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
		// Send the text, clear input field and update message buble
			var new_message = $("#new-message").val();
			socket.emit('text_message', {user: name, message: new_message});

			$("#new-message").val('');
			new_message = "<span class='my_message'>" + name + ": " + new_message + "</span><br>";
			$("#past-messages").append(new_message);
			return false;
    }
});
