var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var data = require('./usuarios')
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
/* 
 * Definir los recursos que vamos a poner disponibles
 * y la lógica a ejecutar en cada uno de ellos.
 */


 //Default Behavior
app.all('/users', function(req, res, next) {
    next();
});


//Show Users List
app.get('/users', function(req, res) {
    console.log('Accesing Users');
    res.render('user-list', { data: data.users() });
    console.log(data.users());
});

/******************************************
//Get and Post Functions to add a new User
******************************************/

//Show the Form to handle de new data to come
app.get('/users/new', function(req, res, next) {
    res.render('new-user');
});


//Make the post to the server to Add the new User
app.post('/users/input', function(req, res, next) {
	//Get the data sent in the body
    var user_name = req.body.user;
    var userId = req.body.userId;

    //Call the function, using the new data
    data.newUser(user_name, userId);
});


/****************************
FILTERS
****************************/


//Show Id Only
app.get('/users/onlyId', function(req, res) {
    console.log('Accesing User Ids');

    //Render the page with only the Id Data
    res.render('user-list', { data: data.userId() });
    console.log(data.userId());
});

//Show Name Only
app.get('/users/onlyName', function(req, res) {
    console.log('Accesing User Names');

    //Render the site with only de Name data
    res.render('user-list', { data: data.usersName() });
    console.log(data.usersName());
});



/**************************
DELETE FUNCTIONS
**************************/

//Delete User By Id - Show the web Page to hande the form
app.get('/users/delete/', function(req, res, next) {
	res.render('delete-by-id');
	
});

//Delete all Users
app.delete('/users', function(req, res, next) {
    //Call the deletAll Function
    data.deleteAll();

    //Send Response
    res.end('Datos Borrados');
    console.log('Los Usuarios fueron eliminados');
});

//Delete user By its Id
app.delete('/users/deleteId/:codigoMan', function(req, res, next) {
	console.log('Borrar Usuario');
	//Recive data from the Url and send it to the function
	data.deleteById(req.params.codigoMan);
	
	//Send response
	res.end('Mansito Borrado');
	res.redirect('/users');
});


/***************************************************/
//SEARCH
/***************************************************/

//Show First Page
app.get('/users/search', function(req, res, next) {
    res.render('search-id');
});

//Search Id
var idSearch;
//Get info from form to proces it
app.post('/users/search-code', function(req, res, next) {
	console.log('Search data Fetched');
	idSearch = req.body.userId;
	console.log('Search for id: '+idSearch);
	res.end('ok');
    
});

//Show Results Page
app.get('/users/search-result', function(req, res, next) {
	console.log('Searched For: '+ idSearch);
	console.log( data.searchById(idSearch) );
    res.render('search-id-result', { data: data.searchById(idSearch) });
});




/****************************
Edit User
****************************/


app.get('/users/edit', function(req, res, next) {
    res.render('edit-user');
});

app.put('/users/', function(req, res, next) {
    /*
    res.write('Debo actualizar el usuario con id: ' + req.params.userId + '\n');
    res.end('Los nuevos datos son: nombre=' + req.body.nombre +
        ' correo=' + req.body.correo);
        */

    var newName = req.body.nombre;
    var id = req.body.codigo;
    console.log('Se Modificara -> Nombre: '+ newName + '  - Codigo: '+ id);

    data.updateById(newName, id);
    res.end("OK");

});


// Ofrecer archivos estáticos si es necesario
app.use(express.static(__dirname + '/public'));

var hostname = 'localhost';
var port = 3000;

app.listen(port, hostname, function() {
    console.log('Servidor corriendo en http://' + hostname + ':' + port + '/');
});
