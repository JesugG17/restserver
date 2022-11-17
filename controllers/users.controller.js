const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

// Obtener
const userGet = async(req = request, res = response) => {

    const { limit = 5, desde = 0 } = req.query;


    /*
        Cuando se tienen datos "borrados" de la base de datos, no se acostumbra borrarlos,
        simplemente cambiar su estado a false, sin embargo, este seguira apareciendo en 
        nuestras peticiones, para validar eso, en el find, podemos mandar un objeto especificando
        a que datos darle prioridad
    */
    
    // condicion
    const query = { estado: true };

    // const users = await User.find( query )
    //        .skip(Number( desde ))
    //        .limit(Number( limit ));
    
    /*
        La instruccion de abajo cuenta la cantidad de registros que se consultaron
    */
    //const total = users.length;

    // La instruccion de abajo cuenta la cantidad de registros que hay en la colleccion
   // const total = await User.countDocuments( query );

    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip(Number( desde ))
            .limit(Number( limit ))
    ]);
    
    res.json( {
        total,
        users,
    } );
}

// Actualizacion
const userPut = async(req, res) => {

    const id = req.params.id;
    const { _id, password, google, correo, ...user  } = req.body;

    // TODO: validar id contra base de datos

    if ( password ) {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt ); 
    }

    const userDB = await User.findByIdAndUpdate( id, user, {new: true} );

    res.json( userDB );
}

// Insertar
const userPost = async (req, res) => {


    /*
    Usualmente se desestructura lo que venga del body porque muchas veces
    el usuario manda informacion que a nosotros no nos interesa y asi nos
    aseguramos de solo agarrar los datos que queremos
    */
    const { nombre, correo, password, role } = req.body;
    const user = new User({nombre, correo, password, role});

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    // GuardarDB
    await user.save()

    res.json( user );
}

// Eliminar
const userDelete = async(req = request, res = response) => {

    const id = req.params.id;
    // Borrar fisicamente
    // No se recomienda porque perderiamos la integridad referencial
    // const user = await User.findByIdAndDelete( id );

    // Simplemente cambiando el estado a false y asi manteniendo la integridad referencial
  
    const user = await User.findByIdAndUpdate( id, { estado: false }, { new: true });
    const userAuth = req.userAuth;

    res.json( {user, userAuth });
}


module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete
}