var express = require('express');
var load = require('express-load');
var path = require('path');
var bodyParser = require('body-parser');

var porta = process.env.PORT || 3001;
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
  console.log('socket connectado...');
});

app.get('/', function(request, response){
  response.render('index');
});

app.get('/sortear', function(request, response){
  ACTIVATION = 'true';
  console.log('disparou sortear...');
  io.sockets.emit('emissor', ACTIVATION);
  response.json({});
});

app.get('/result/:color', function(request, response){
  console.log(request.params.color);
  io.sockets.emit('process',  request.params.color);
<<<<<<< HEAD
  //return true;
  response.json({});
=======
  return true;
>>>>>>> b6225ba1cfbd5debfbdb273a9003824a17586977
});

//setInterval(() => {
  //var dt = Date.now();
<<<<<<< HEAD
  //io.sockets.emit('emissor', ACTIVATION);
//}, 10000);
=======
  io.sockets.emit('emissor', ACTIVATION);
}, 10000);
>>>>>>> b6225ba1cfbd5debfbdb273a9003824a17586977

server.listen(porta, function () {     
  console.log("Aplicacao no ar em localhost: " + porta); 
});