const { request, response } = require("express");
const user = require("../models/user");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");


const login = async(req = request, res = response) => {

    const { correo, password } = req.body;

    try {


        // Verificar si el email existe
        const userDB = await user.findOne({ correo });

        console.log( userDB );
        
        if ( !userDB )  {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo'
            });
        }

        // SI el usuario esta activo en la BD
        if ( !userDB.estado ) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado = false'
            });
        }
        
        // Verificar la contraseña
        
        const validPassword = bcrypt.compareSync( password, userDB.password );

        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password'
            });
        }
        
        // Generar el JWT
        const token = await generarJWT( userDB.id );


        res.json({
            userDB,
            token
        });

    } catch (error) {
        console.log( error );
        res.status(500).json({
            msg: 'Algo salio mal'
        });
    }

}






module.exports = {
    login
}