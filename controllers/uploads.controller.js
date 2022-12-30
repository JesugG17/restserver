const { User, Producto } = require('../models');
const { subirArchivo } = require("../helpers/subir-archivo");
const path = require('path');
const fs = require('fs');
const { request, response } = require('express');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const cargarArchivo = async(req = request, res = response) => {
  
    try {
        const nombre = await subirArchivo(req.files, 'textos', ['txt', 'md']);
        res.json({
            nombre
        });
    } catch (err) { 
        res.status(400).json({
            msg: err
        });
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

}

const actualizarArchivo = async(req = request, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch( coleccion ) {
        case 'usuarios':            
            modelo = await User.findById( id );
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id '${ id }'`
                });
            }
        break;
        case 'productos':
            modelo = await Producto.findById( id );
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id '${ id }'`
                });
            }
        break;
        default: res.status(500).json({
            msg: 'Esta coleccion no ha sido implementada'
        });
    }

    // Limpieza previa
    if ( modelo.img ) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if ( fs.existsSync(pathImagen) ) {
            fs.unlinkSync( pathImagen );
        }
    }

    try {
        const nombre = await subirArchivo(req.files, coleccion, undefined);
        modelo.img = nombre;
    } catch (msg) {
        return res.status(400).json({ msg });
    }
    
    await modelo.save();
    
    res.json( modelo );
}

const actualizarArchivoCloudinary = async(req = request, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch( coleccion ) {
        case 'usuarios':            
            modelo = await User.findById( id );
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id '${ id }'`
                });
            }
        break;
        case 'productos':
            modelo = await Producto.findById( id );
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id '${ id }'`
                });
            }
        break;
        default: res.status(500).json({
            msg: 'Esta coleccion no ha sido implementada'
        });
    }

    // Limpieza previa
    if ( modelo.img ) {
       const nombreArr = modelo.img.split('/');
       const nombre = nombreArr[nombreArr.length - 1];
       const [ public_id ] = nombre.split('.');
       cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    modelo.img = secure_url;
    
    res.json( modelo );
}

const mostrarImagen = async(req = request, res = response) => {
    
    const { id, coleccion } = req.params;
    const placeHolder = path.join(__dirname, '../assets/no-image.jpg');

    let modelo;

    switch( coleccion ) {
        case 'usuarios':            
            modelo = await User.findById( id );
            if (!modelo) {
                return res.sendFile( placeHolder );
            }
        break;
        case 'productos':
            modelo = await Producto.findById( id );
            if (!modelo) {
                return res.sendFile( placeHolder );
            }
        break;
        default: res.status(500).json({
            msg: 'Esta coleccion no ha sido implementada'
        });
    }

    // Limpieza previa
    if ( modelo.img ) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if ( fs.existsSync(pathImagen) ) {
            return res.sendFile( pathImagen );
        }
    }

    res.sendFile( placeHolder );
}


module.exports = {
    cargarArchivo,
    actualizarArchivo,
    mostrarImagen,
    actualizarArchivoCloudinary
}