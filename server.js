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
app.listen(port, function () {
  console.log('Server running on port', app.get('port'));
});

app.get('/',function(req,res){
    res.render('index');
});
