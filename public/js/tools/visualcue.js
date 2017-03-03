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
$("#teacher-display").click(function(){
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
	$("#teacher-display").append(
	$('<div id="visualcue_canvas"></div>')
		.css('position', 'absolute')
		.css('top', coor1 - 55 + 'px')
		.css('left', coor0 - 5 + 'px')
		.css('width', size)
		.css('height', size)
		.css('background-color', color)
				);
}

function remove_dot(){
	$('#visualcue_canvas').remove();
}
