import User from '../models/user.js'

export function loadUsers(){
    User.create({id: 1, nombre: 'Bartolome', email: 'bartolome@gmail.com'});
    User.create({id: 2, nombre: 'Alfonso', email: 'alfonso@gmail.com'});
    User.create({id: 3, nombre: 'Maria', email: 'maria@gmail.com'});
    User.create({id: 4, nombre: 'Vanesa', email: 'Vananesa@gmail.com'});
    User.create({id: 5, nombre: 'Victoria', email: 'Victoria@gmail.com'});
    User.create({id: 6, nombre: 'Rafael', email: 'Rafael@gmail.com'});

    console.log('Usuarios cargados correctamente');
}


