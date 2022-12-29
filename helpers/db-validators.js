const { Categoria, Role, User, Producto } = require('../models');

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

const existeCategoria = async( nombre = '' ) => {

    nombre = nombre.toUpperCase();

    const categoria = await Categoria.findOne({ nombre, estado: true });

    if ( !categoria ) {
        throw new Error(`La categoria ${ nombre } no existe en la base de datos`);
    }

}

const existeIdCategoria = async( id ) => {

    const categoria = await Categoria.findOne({ _id: id, estado: true});
    if ( !categoria ) {
        throw new Error(`No existe una categoria con el id ${ id }`);
    }

}

const existeIdProducto = async( id ) => {

    const producto = await Producto.findById({ _id: id, estado: true });
    if ( !producto ) {
        throw new Error(`El producto con el id ${ id } no existe`);
    }
}

const existeProducto = async( nombre ) => {

    const producto = await Producto.findOne({ nombre, estado: true });
    if ( producto ) {
        throw new Error(`El producto ${ nombre } ya existe en la base de datos`);
    }

}

const coleccionesPermitidas = ( coleccion = '', coleccionesPermitidas = [] ) => {

    if (!coleccionesPermitidas.includes(coleccion)) {
        throw new Error(`La coleccion ${ coleccion } no existe - ${ coleccionesPermitidas }`);
    }

    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    idExiste,
    existeCategoria,
    existeIdCategoria,
    existeProducto,
    existeIdProducto,
    coleccionesPermitidas
}