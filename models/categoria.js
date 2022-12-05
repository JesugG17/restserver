const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre de la categoria es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

CategoriaSchema.methods.toJSON = function() {
    const { __v, _id: uid, ...categoria } = this.toObject();
    return { uid, ...categoria };
}

module.exports = model('Categoria', CategoriaSchema);