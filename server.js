var port = process.env.PORT||3000;
var express = require('express');
var path    = require("path");

//the server code
//create the server and also handle requests
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', (process.env.PORT || 3000));
//start the server and notify it start with the address in the console
var server = app.listen(port, function () {
  console.log('Server running on port', app.get('port'));
});

app.get('/',function(req,res){
    res.render('index');
});

app.get('/teacher_demo', function(req, res) {
  res.render('teacher_demo');
});

app.get('/class',function(req,res){
    res.render('class');
});

app.get('/revised_style',function(req,res){
    res.render('revised_style');
});


// Initiating socket.io connection
var io = require('socket.io')(server);
io.on('connection', function(client){
	// Listening for outgoing text messages to be broadcasted
	client.on('text_message', function(data){
		client.broadcast.emit('text_message', data);
	});
  client.on('user_connected', function(data){
    client.broadcast.emit('user_connected', data);
  });
  client.on('user_disconnected', function(data){
    client.broadcast.emit('user_disconnected', data);
  });
  client.on('coordinates', function(data){
		client.broadcast.emit('coordinates', data);
	});

  client.on('show_word', function(data){
    client.broadcast.emit('show_word', data);
  });

  client.on('remove_word', function(data){
    client.broadcast.emit('remove_word', data);
  });
});
io.listen(3010);
