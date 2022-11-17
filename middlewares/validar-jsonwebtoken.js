const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validarJWT = async(req = request, res = response, next) => {

    const { 'x-token': token } = req.headers;

    if ( !token ) {
        return res.status(400).json({
            msg: 'No hay token en la aplicacion'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.MYSECRETKEY );
        
        const usuario = await User.findById( uid ); 

        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario no encontrado'
            })
        }

        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario no encontrado'
            });
        }

        req.userAuth = usuario;

        next();
    } catch (error) {
        console.log( error );
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }

}

module.exports = {
    validarJWT
}