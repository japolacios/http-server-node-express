var usuarios = [
    { nombre: "Miguel", codigo: 0 },
    { nombre: "Victor", codigo: 1 },
    { nombre: "Arturo", codigo: 2 },
    { nombre: "Pedo", codigo: 3 },
    { nombre: "Chavo", codigo: 4 },
    { nombre: "Yaggi", codigo: 5 },
    { nombre: "Julian", codigo: 6 },
    { nombre: "Milton", codigo: 7 },
    { nombre: "Sr.Conejo", codigo: 8 },
    { nombre: "Ms.Smith", codigo: 9 }
];


//Show All Users
exports.users = function() {
    console.log('Show all Users');
    return usuarios;
};


//Show Only Ids
exports.userId = function() {
    console.log('Fetching Users Ids');

    var ids = [];

    for (var i = usuarios.length - 1; i >= 0; i--) {
        ids.push({ codigo: usuarios[i].codigo });
    }

    return ids;
}


//Show Only Names
exports.usersName = function() {
    console.log('Fetching Users Nombre');

    var nombres = [];

    for (var i = usuarios.length - 1; i >= 0; i--) {
        nombres.push({ nombre: usuarios[i].nombre });
    }

    return nombres;
}



exports.searchByName = function(name) {
    var i = 0;
    while (i < usuarios.length) {
        var tempName = usuarios[i].nombre;
        if (tempName == name) {
            return usuarios[i];
        }
        i++;
    }
}


//Search by Id
exports.searchById = function(id) {
    var i = 0;
    var userSearch = []
    while (i < usuarios.length) {
        var tempid = usuarios[i].codigo;
        if (tempid == id) {
            userSearch.push({ codigo: usuarios[i].codigo, nombre: usuarios[i].nombre});
        }
        i++;
    }

    return userSearch;
}

exports.newUser = function(name, id) {
    usuarios.push({ "nombre": name, "codigo": id })
    console.log('New User Added');
}


exports.updateById = function(name, id) {
    usuarios[id] = { "nombre": name, "codigo": id };
}

exports.deleteAll = function() {
    usuarios = [];
    console.log('All Users deleted');
}

exports.deleteById = function(id) {
    console.log('Delete Function accessed');

    if (id > -1) {
        usuarios.splice(id, 1);
    }

    console.log('User Deleted');

}
