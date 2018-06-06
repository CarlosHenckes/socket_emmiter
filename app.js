var express = require('express');
var load = require('express-load');
var path = require('path');
var bodyParser = require('body-parser');

var porta = process.env.PORT || 3000;
var app = express();

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
  console.log('chegou um chamado...');
});

setInterval(()=>{
  var dt = Date.now();
  io.sockets.emit('emissor', dt);
  //console.log(dt);
}, 5000);

server.listen(porta, function () {     
  console.log("Aplicacao no ar em " + porta); 
});