var socket = io.connect(window.location.hostname);

// Handling incoming text message
socket.on('coordinates', function(data){
	// $("#teacher-display").
	var color = '#000000';
  var size = '1px';
  $("#teacher-display").append(
  $('<div></div>')
    .css('position', 'absolute')
    .css('top', coor[1] + 'px')
    .css('left', coor[0] + 'px')
    .css('width', size)
    .css('height', size)
    .css('background-color', color)
        );
});

// Handling event when user clicks enter to send text message
$("#teacher-display").click(function(){
		var coor = [];
		var x = event.clientX;
		var y = event.clientY;
		coor.push(x);
		coor.push(y);
		// var coor = "X coords: " + x + ", Y coords: " + y;
		socket.emit('coordinates', coor);
});
