const validarCampos = require('./validar-campos');
const validarRoles = require('./validar-roles');
const validarJWT = require('./validar-jsonwebtoken');
const validarArchivoSubir = require('./validar-archivo');

module.exports = {
    ...validarCampos,
    ...validarRoles,
    ...validarJWT,
    ...validarArchivoSubir
}