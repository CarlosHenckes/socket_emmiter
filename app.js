var express = require('express');
var load = require('express-load');
var path = require('path');
var bodyParser = require('body-parser');

var porta = process.env.PORT || 3000;
var app = express();

var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var ACTIVATION = 'false';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
  console.log('chegou um chamado...');
});

app.get('/', function(request, response){
  response.render('index');
});

app.get('/sortear', function(request, response){
  ACTIVATION = 'true';
});

setInterval(() => {
  //var dt = Date.now();
  io.emit('emissor', ACTIVATION);
  console.log(ACTIVATION);
}, 5000);

server.listen(porta, function () {     
  console.log("Aplicacao no ar em " + porta); 
});