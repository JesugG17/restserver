const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'LA contraaseña es obligatorio'],
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


/*
    Tiene que ser una funcion normal porque haremos uso de la palabra reservada
    "this" y la funcion de flecha no nos permite usar dicha palabra
*/
UserSchema.methods.toJSON = function() {
    const { __v, password, _id: uid, ...user } = this.toObject();
    return { uid, ...user };
}

/*
    Cuando hacemos una peticion y deseamos quitar ciertos parametros que seran
    guardados en la base de datos, usamos este metodo que se llama "toJSON",
    desestructuramos los campos que deseamos que no sean visibles y luego
    con el operador rest obtengo los que si quiero que sean visibles en la
    base de datos
*/

module.exports = model( 'User', UserSchema );