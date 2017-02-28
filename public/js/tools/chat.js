//Connect and add to userlist
socket.on('connect', function(){
	socket.emit('user_connected', {user: name});
});

//User disconnected, send signal for disconnect
socket.on('disconnect', function() {
	socket.emit('user_disconnected', {user: name});
});


socket.on('user_connected', function(data) {
	var new_message = "<span class='generic_message'>" + data.user + " has connected" + "</span><br>";
	$("#past-messages").append(new_message);
});

socket.on('user_disconnected', function(data) {
	var new_message = "<span class='generic_message'>" + data.user + " has disconnected" + "</span><br>";
	$("#past-messages").append(new_message);
});

// Handling incoming text message
socket.on('text_message', function(data){
	var new_message = "<span class='not_my_message'>" + data.user + ": " +  data.message + "</span><br>";
	$("#past-messages").append(new_message);
});

socket.on('show_word', function(data){
  var subtitles = document.getElementById("subtitles");
  subtitles.removeAttribute("class");
  var subtitle_word = document.getElementById("subtitle-header");
  var subtitle_definition = document.getElementById("subtitle-text");
  subtitle_word.innerHTML = data.word;
  subtitle_definition.innerHTML = data.definition;
	var appElement = document.querySelector('[ng-app=dictionary]');
	var $scope = angular.element(appElement).scope();
	$scope.$apply(function() {
		$scope.entries.push({
			word: data.word,
			definition: data.definition,
		});
	});
});

socket.on('remove_word', function(data) {
	var subtitles = document.getElementById("subtitles");
	subtitles.className += "hidden-subtitle";
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
