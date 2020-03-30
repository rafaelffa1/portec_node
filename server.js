var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');
var io = require('./app/connectionSocket');

const app = express();
const server = require('http').Server(app);
app.use((req, res, next) => {
  return next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./app/router'));

var port = process.env.port || 21170
// var port = process.env.port || 8001
// var port2 = process.env.port || 8002
// io.listen(port2);
server.listen(port);
console.log("Iniciando a app na porta " + port);


