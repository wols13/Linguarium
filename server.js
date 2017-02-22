var port = 3000;
var express = require('express');

//the server code
//create the server and also handle requests
var app = express();
app.set('port', (process.env.PORT || 5000));
//start the server and notify it start with the address in the console
app.listen(port, function () {
  console.log('Server running on port', app.get('port'));
});

app.get('/',function(req,res){
     res.sendFile('index.html');
});
