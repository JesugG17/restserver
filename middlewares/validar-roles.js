const { request, response } = require("express");

const esAdminRole = ( req = request, res = response, next ) => {

    if ( !req.userAuth ) {
        res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }
    const { role, nombre } = req.userAuth;

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ nombre} no es ADMINISTRADOR`
        });
    }

    next();

}

const tieneRol = ( ...roles ) => {

    return (req, res, next) => {
        
        if ( !req.userAuth ) {
            res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        const userAuth = req.userAuth;
        if ( !roles.includes(userAuth.role) ) {
            return res.status(401).json({
                msg: `EL SERVICIO OCUPA UNO DE ESTOS ROLES ${ roles }`
            });
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRol
}