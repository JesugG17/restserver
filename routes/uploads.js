const { Router } = require('express');

const { check } = require('express-validator');

const { cargarArchivo, 
        mostrarImagen, 
        actualizarArchivoCloudinary } = require('../controllers/uploads.controller');

const { coleccionesPermitidas } = require('../helpers/db-validators');

const { validarCampos, validarArchivoSubir } = require('../middlewares');

const router = Router();

router.post('/', validarArchivoSubir,cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos']) ),
    validarCampos
], actualizarArchivoCloudinary);

router.get('/:coleccion/:id',[
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos']) ),
    validarCampos
], mostrarImagen);

module.exports = router;