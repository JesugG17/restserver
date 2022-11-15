const mongoose = require('mongoose');


const dbConnection = () => {
    try {
        mongoose.connect( process.env.MONGODB_ATLAS );
        console.log('base de datos online');
    } catch (error) {
        console.log( error );
        throw new Error('Error en la conexion de la base de datos');
    }

}

module.exports = {
    dbConnection
}