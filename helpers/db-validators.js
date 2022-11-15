const Role = require('../models/role');
const User = require('../models/user');

const esRoleValido = async( role = '') => {
    const existeRole = await Role.findOne({ role });
    if ( !existeRole ) {
        throw new Error(`El rol ${ role } no existe en la base de datos`);
    }
}

const emailExiste = async( correo ) => {
    const existeCorreo = await User.findOne({ correo });
    if ( existeCorreo ) {
        throw new Error(`El correo ${ correo } ya existe en la base de datos`);
    } 
}

const idExiste = async( id ) => {
    const existeId = await User.findById( id );
    if ( !existeId ) {
        throw new Error(`El id ${ id } no existe en la base de datos`);
    } 
}

module.exports = {
    esRoleValido,
    emailExiste,
    idExiste
}