var name = "Default";
var socket = null;
var user_id = Math.floor((Math.random() * 999999) + 1);
var appElement = document.querySelector('[ng-app=linguarium]');
var $scope = angular.element(appElement).scope();

function updateScroll() {
	var element = document.getElementById("past-messages");
	element.scrollTop = element.scrollHeight;
}

window.onload = function () {
	if (location.hostname === "localhost") {
		socket = io.connect()
	} else {
		socket = io.connect(window.location.hostname);
	}

	// Handling incoming text message
	socket.on('text_message', function (data) {
		var new_message = "<span class='not_my_message'><span class='message_sender'>" + data.user + ": </span>" + data.message + "</span><br>";
		$("#past-messages").append(new_message);
		updateScroll();
	});

	socket.on('user_connected', function (data) {
		var appElement = document.querySelector('[ng-controller=user_list]');
		var $scope = angular.element(appElement).scope();
		$scope.$apply(function() {
			$scope.updateUserList(data);
		});
	});

	socket.on('user_disconnected', function (data) {
		var appElement = document.querySelector('[ng-controller=user_list]');
		var $scope = angular.element(appElement).scope();
		$scope.$apply(function () {
			$scope.updateUserList(data);
		});
	});

	//Raise hand of user
	socket.on('raise_hand', function(data) {
		var appElement = document.querySelector('[ng-controller=user_list]');
		var $scope = angular.element(appElement).scope();
		if ($scope.role == 'teacher') {
			var audio = new Audio('sounds/Ding.mp3');
     		audio.play();
		}
		$scope.$apply(function () {
			$scope.raiseHand(data.id);
		});
	});

	// Handling event when user clicks enter to send text message
	$("#new-message").keypress(function (e) {
		if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
		if (keyCode == '13') {
			// Send the text, clear input field and update message buble
			var new_message = $("#new-message").val();
			if (new_message.length > 0) {
				socket.emit('text_message', { user: name, message: new_message });

				$("#new-message").val('');
				new_message = "<span class='my_message'>" + new_message + "</span><br>";
				$("#past-messages").append(new_message);
				updateScroll();
			}
			return false;
		}
	});

	// Handling incoming text message
	socket.on('coordinates', function (data) {
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
		draw_dot(data[1], data[0]);
		setTimeout(remove_dot, 1500);
	});

	//Socket code for users


	//Socket code for dictionary
	socket.on('show_word', function (data) {
		var subtitles = document.getElementById("subtitles");
		subtitles.removeAttribute("class");
		var subtitle_word = document.getElementById("subtitle-header");
		var subtitle_definition = document.getElementById("subtitle-text");
		subtitle_word.innerHTML = data.word;
		subtitle_definition.innerHTML = data.definition;
		var appElement = document.querySelector('[ng-controller=dictionary]');
		var $scope = angular.element(appElement).scope();
		$scope.$apply(function () {
			$scope.addEntryFromJavascript(data);
		});
	});

	socket.on('remove_word', function (data) {
		var subtitles = document.getElementById("subtitles");
		subtitles.className += "hidden-subtitle";
	});


	// Handling event when user clicks enter to send text message
	$("#workspace-main").click(function () {
		var coor = [];
		var x = event.clientX;
		var y = event.clientY;
		coor.push(x);
		coor.push(y);
		// var coor = "X coords: " + x + ", Y coords: " + y;
		socket.emit('coordinates', coor);
	});

	function draw_dot(coor1, coor0) {
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

	function remove_dot() {
		$('#visualcue_canvas').remove();
	}

	//User disconnected, send signal for disconnect
	$(window).on("beforeunload", function () {
		socket.emit('user_disconnected', { user: name, id: user_id });
	});

	name = prompt("Please enter your name", "");

	var role = $scope.role;
	//Find a random user id between 1 and 999999
	var user_details = { user: name, role: role, id: user_id, hand_raised: false, points: 0 }
	socket.emit('user_connected', user_details);
}
