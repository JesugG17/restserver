const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jsonwebtoken');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria,  } = require('../controllers/categoria.controller');
const { existeCategoria, existeIdCategoria } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

// TODO:
// Middleware existeCategoria
// los controladores

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener todas las categorias - publico
router.get('/:id',[
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom( existeIdCategoria ),
    validarCampos
], obtenerCategoria);

// crear una categoria - con Token
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre de la catagoria es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar una categoria - con Token
router.put('/:id',[
    validarJWT,
    check('id', "No es un id valido de mongo").isMongoId(),
    check('id').custom( existeIdCategoria ),
    check('nombre', 'Si deseas actualizar, el nombre de la nueva categoria es obligatorio').not().isEmpty(),
    check('nombre').custom( existeCategoria ),
    validarCampos
], actualizarCategoria);

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom( existeIdCategoria ),
    validarCampos
], borrarCategoria);


module.exports = router;