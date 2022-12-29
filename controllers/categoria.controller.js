const { request, response } = require("express");
const { Categoria } = require('../models/')

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req = request, res = response) => {

    const { limit, desde } = req.query;

    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(),
        Categoria.find( query )
                 .populate('usuario', 'nombre')
                 .skip(Number( desde ))
                 .limit(Number( limit ))
    ]);

    res.json({
        total,
        categorias,
    });

}

// obtenerCategoria - populate
const obtenerCategoria = async(req = request, res = response) => {

    const id = req.params.id;
    
    const categoria = await Categoria.findById( id ).populate('usuario','nombre');

    res.json( categoria );

}

const crearCategoria = async(req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre } ya existe en la BD`
        });
    }

    const data = {
        nombre,
        usuario: req.userAuth._id,
        estado: true
    };

    const categoria = new Categoria( data );

    await categoria.save();

    res.json( categoria );

}


// actualizarCategoria 
const actualizarCategoria = async(req = request, res = response) => {

    const id = req.params.id;

    const nombre = req.body.nombre.toUpperCase();

    const newData = {
        nombre,
        usuario: req.userAuth._id,
        estado: true
    }
    
    const categoria = await Categoria.findByIdAndUpdate(id, newData, { new: true });

    res.json( categoria );

}

// borrarCategoria
const borrarCategoria = async(req = request, res = response) => {

    const id = req.params.id;

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false}, {new : true});
    
    res.json( categoria );

}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}