const Router = require('express');

const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { existeCategoria, existeProducto, existeIdProducto } = require('../helpers/db-validators');

const { eliminarProducto, 
        obtenerProductos, 
        obtenerProducto, 
        crearProducto, 
        actualizarProducto } = require('../controllers/producto.controller');

// TODO: HACER LAS 5 RUTAS
const router = Router();

router.get('/', obtenerProductos);

router.get('/:id',[
    check('id', 'No es un id valido de mongo').isMongoId(),
    validarCampos
], obtenerProducto);

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria').custom( existeCategoria ), 
    validarCampos
],crearProducto);

router.put('/:id',[
    validarJWT,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('precio', 'El precio debe de ser un dato numerico').isNumeric(),
    check('nombre').custom( existeProducto ),
    esAdminRole,
    validarCampos
],actualizarProducto);

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom( existeIdProducto ),
    validarCampos
], eliminarProducto);


module.exports = router;