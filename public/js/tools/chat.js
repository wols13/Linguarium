var socket = io();

// Handling incoming text message
socket.on('text_message', function(data){
	var new_message = "<span class='not_my_message'>" + data + "</span><br>";
	$("#past-messages").append(new_message);
});

// Handling event when user clicks enter to send text message
$("#new-message").keypress(function(e){
	if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
		// Send the text, clear input field and update message buble
		var new_message = $("#new-message").val();
		socket.emit('text_message', new_message);
		
		$("#new-message").val('');
		new_message = "<span class='my_message'>" + new_message + "</span><br>";
		$("#past-messages").append(new_message);
		return false;
    }
});
