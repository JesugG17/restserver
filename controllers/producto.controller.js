const { request, response } = require("express");
const { Producto, Categoria } = require('../models');
// TODO:
// hacer las mismas 5 funciones que en categorias

const obtenerProductos = async(req = request, res = response) => {
    
    const { limit, desde } = req.params;

    const [productos, total] = await Promise.all([
        Producto.find()
                .limit(Number( limit ))
                .skip(Number( desde )),
        Producto.countDocuments()
    ]);
    
    res.json({
        total,
        productos
    })
}

const obtenerProducto = async(req = request, res = response) => {
    
    const id = req.params.id;

    const producto = await Producto.findById( id );

    res.json( producto );
}

const crearProducto = async(req = request, res = response) => {
    
    const { nombre, precio, descripcion, categoria } = req.body;

    const categoriaDB = await Categoria.findOne({ categoria });

    if ( !categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoria } no existe en la base de datos`
        });
    }

    const productoDB = await Producto.findOne({ nombre });

    if ( productoDB ) {
        return res.json({
            msg: `El producto ${ productoDB.nombre } ya existe en la base de datos`
        });
    }

    const data = {
        nombre,
        estado: true,
        usuario: req.userAuth._id,
        disponible: true,
        precio,
        descripcion,
        categoria: categoriaDB._id
    };

    const producto = new Producto( data );

    await producto.save();

    res.json( producto );

}

const actualizarProducto = async(req = request, res = response) => {
    
    const id = req.params.id;
    const { nombre, precio, descripcion } = req.body;

    const data =  {
        nombre,
        precio,
        descripcion,
        usuario: req.userAuth._id,
    }


    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json( producto );

}

const eliminarProducto = async(req = request, res = response) => {
    
    const id = req.params.id;

    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, {new: true});

    res.json( producto );
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};