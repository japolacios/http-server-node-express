/**
 * http://usejsdoc.org/
 */
// Importar el módulo http
var http = require('http');

// Crear un nuevo servidor http y configrarlo
var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function(req, res){
	console.log(req.headers);
	
	res.writeHead(200, {'Content-Type':'text/html'});
	res.end('<h1>Hola soy un Servidor Web</h1>');
});

server.listen(port, hostname, function(){
	console.log('Servidor corriendo en http://'+hostname+':'+port+'/');
});