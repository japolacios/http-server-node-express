/**
 * http://usejsdoc.org/
 */
var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));


var hostname = 'localhost';
var port = 3000;

app.listen(port, hostname, function(){
	console.log('Servidor corriendo en http://'+hostname+':'+port+'/');
});