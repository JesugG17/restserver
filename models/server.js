const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        
        // Conectar a base de datos
        this.conectarDB();

        // Middlewares 
        // Son funciones que siempre van a ejecutarse al levantarse el servidor
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    conectarDB() {
        dbConnection();
    }
    
    middlewares() {
        // Directorio publico
        this.app.use( express.static('public'));

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );
    }
    
    // Metodo para definir las rutas que yo quiero
    routes() {
      
        this.app.use(this.usersPath, require('../routes/user'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        }); 
    }


    
}

module.exports = Server;