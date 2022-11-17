const { Router } = require('express');

const { check } = require('express-validator');

const { esRoleValido, 
        emailExiste, 
        idExiste } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jsonwebtoken');

const { userGet, 
        userPut, 
        userPost, 
        userDelete } = require('../controllers/users.controller');


const router = Router();

router.get('/', userGet);

router.put('/:id',[
        check('id', 'El id no es valido').isMongoId(),
        check('id').custom( idExiste ),
        check('role').custom( esRoleValido ),
        validarCampos
], userPut);

router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser de mas de 6 letras').isLength({ min: 6}),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom( emailExiste ),
        // check('role', 'No es un role permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('role').custom( esRoleValido ),
        validarCampos
], userPost);

router.delete('/:id', [
        validarJWT,
        // esAdminRole,
        tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'El id no es valido').isMongoId(),
        check('id').custom( idExiste ),
        validarCampos,
], userDelete);

module.exports = router;