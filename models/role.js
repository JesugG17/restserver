const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        require: [true, 'El rol es obligatorio'],
        unique: true
    }
});

module.exports = model( 'Role', RoleSchema );