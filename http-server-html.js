/**
 * http://usejsdoc.org/
 */
// Importar el módulo http
var http = require('http');
// Importar librerias del sistema de archivos
var fs = require('fs');
var path = require('path');

// Crear un nuevo servidor http y configurarlo que hacer
var server = http.createServer(function(req, res){
	// Aquí cambiaremos la lógica de nuestro servidor
	console.log('Ha llegado una solicitud para '+req.url+' con el método '+req.method);
	
	if(req.method == 'GET'){
		// identifica cual archivo se va a enviar en la respuesta
		var fileUrl;
		
		if(req.url == '/'){
			fileUrl = '/index.html';
		}else{
			fileUrl = req.url;
		}
		
		var filePath = path.resolve('./public/'+fileUrl);
		var fileExt = path.extname(filePath);
		
		if(fileExt=='.html'){
			fs.exists(filePath, function(exists){
				// Que hacer si el archivo existe o no
				
				if(!exists){
					// Si el archivo no existe se envia 404 
					// y terminar la solicitud
					res.writeHead(404, {'Content-Type':'text/html'});
					res.end('<h1>Error 404: No se encontró el archivo '+fileUrl+'</h1>');
					return;
				}
				
				// Si el archivo existe enviamos 200 OK y el contenido del archivo
				res.writeHead(200, {'Content-Type':'text/html'});
				fs.createReadStream(filePath).pipe(res);
			});
		}else{
			res.writeHead(404, {'Content-Type':'text/html'});
			res.end('<h1>Error 404: El archivo '+fileUrl+' no es HTML</h1>');
		}
	}else{
		res.writeHead(404, {'Content-Type':'text/html'});
		res.end('<h1>Error 404: Las solicitudes '+req.method+' no están soportadas</h1>');
	}

});

// Encender el servidor y comenzar a atender solicitudes
var hostname = 'localhost';
var port = 3000;

server.listen(port, hostname, function(){
	console.log('Servidor corriendo en http://'+hostname+':'+port+'/');
});