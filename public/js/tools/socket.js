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

	// Handling incoming text message
socket.on('coordinates', function(data){
	console.log(data);
	// $("#teacher-display").
	var color = '#ff0000';
  var size = '10px';
  // $("#teacher-display").append(
  // $('<div id="visualcue_canvas"></div>')
  //   .css('position', 'absolute')
  //   .css('top', data[1] - 55 + 'px')
  //   .css('left', data[0] - 5 + 'px')
  //   .css('width', size)
  //   .css('height', size)
  //   .css('background-color', color)
  //       );
	  draw_dot(data[1], data[0] );
		setTimeout(remove_dot, 1500);
});

// Handling event when user clicks enter to send text message
$("#workspace-main").click(function(){
		var coor = [];
		var x = event.clientX;
		var y = event.clientY;
		coor.push(x);
		coor.push(y);
		// var coor = "X coords: " + x + ", Y coords: " + y;
		socket.emit('coordinates', coor);
});

function draw_dot(coor1,coor0){
	var color = '#ff0000';
  var size = '10px';
	$("#workspace-main").append(
	$('<div id="visualcue_canvas"></div>')
		.css('position', 'absolute')
		.css('top', coor1 - 60 + 'px')
		.css('left', coor0 - 310 + 'px')
		.css('width', size)
		.css('height', size)
		.css('background-color', color)
				);
}

function remove_dot(){
	$('#visualcue_canvas').remove();
}


	//User disconnected, send signal for disconnect
	$(window).on("beforeunload", function() {
		socket.emit('user_disconnected', {user: name});
	});

	name = prompt("Please enter your name", "");
	socket.emit('user_connected', {user: name});
}