
var Logger = require('le_node');
var log = new Logger({
  token:'69c24d93-3677-47d6-954c-984d58932924'
});

var fs = require('fs');

require('colors');

_ = require('lodash');


var events = require('events');

// Core
Matrix = require('./lib');

if ( fs.existsSync('./config/_state.js') ){
  Matrix.bootstrap = true;
  Matrix.state = fs.readSync('./config/_state.js');
} else {
  Matrix.bootstrap = false;
  Matrix.state = {};
}

//Event Loop
Matrix.events = new events.EventEmitter();

Matrix.config = require('./config');
config = Matrix.config;
//Deal with users

// Example
/*
Matrix.events.on('poop', function(data){
  log('iPooped!',data);
});

Matrix.events.emit('poop', { stinky: true });
*/


api = require('admatrix-node-sdk');

Matrix.api = api;

Matrix.event.init();

var init = function(cb){
  // Matrix.event.api.init();

  var options = api.defaultConfig;
  api.start( options, function(err, state){
    if (err) return cb(err);
    console.log('Client Access Token', state);
    Matrix.events.emit('api-connect', state);
    cb(err, state);
  });
}

console.log('========== vvv API vvv =========\n'.blue, api, "\n======== ^^^ API ^^^ =======".blue);




Matrix.activeUser = false;
Matrix.activeDevice = false;


console.log('========== vvv MATRIX vvv =========\n'.yellow, Matrix, "\n======== ^^^ MATRIX ^^^ =======".yellow);
module.exports =
{ Matrix: Matrix,
init: init }
