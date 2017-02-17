/**
 * http://usejsdoc.org/
 */
var express = require('express');
var http = require('http');

var app = express();

app.use(function(req, res){
	console.log(req.headers);
	
	res.writeHead(200, {'Content-Type':'text/html'});
	res.end('<h1>Hola soy un Servidor Web con express</h1>');
});

var server = http.createServer(app);

var hostname = 'localhost';
var port = 3000;

server.listen(port, hostname, function(){
	console.log('Servidor corriendo en http://'+hostname+':'+port+'/');
});