const { request, response } = require("express");
const { Collection, isValidObjectId } = require("mongoose");
const { User, Categoria, Producto } = require('../models');


const coleccionesPermitidas = [
    "categorias",
    "productos",
    "usuarios",
    "roles"
];

const buscarUsuarios = async( termino = '', res = response) => {

    const esMongoId = isValidObjectId(termino);

    if (esMongoId) {
        const usuario = User.findById(termino);
        res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }

}

const buscar = async(req = request, res = response) => {

    const { coleccion , termino } = req.params;
    

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${ coleccionesPermitidas }`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;
        case 'productos':
        break;
        case 'categorias':
        break;
        default:
            res.status(500).json({
                msg: 'Esta opcion no se ha implementado'
            })
    }


    res.json({
        coleccion, termino
    });
}


module.exports = {
    buscar
}
