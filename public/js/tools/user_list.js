function updateUserList(data){
	var user_list = "";
	for (var i = 0; i < data.length; i++){
		user_list += "<p class='user_list_item'><i class='fa fa-circle online-icon' aria-hidden='true'></i>" + data[i] + "</p>";
	}
	$("#userlist-inner").empty();
	$("#userlist-inner").append(user_list);
}

//User disconnected, send signal for disconnect
$(window).on("beforeunload", function() {
	socket.emit('user_disconnected', {user: name});
});

socket.on('user_connected', function(data) {
	updateUserList(data);
});

socket.on('user_disconnected', function(data) {
	updateUserList(data);
});