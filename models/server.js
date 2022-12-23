const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            productos: '/api/productos',
            users:'/api/users',
            buscar: '/api/buscar'
        };

        // this.usersPath = '/api/users';
        // this.authPath = '/api/auth';
        // this.categoriasPath = '/api/categorias';
        // this.productosPath = '/api/productos';
        
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

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.users, require('../routes/user'));
        this.app.use(this.paths.categorias, require('../routes/categoria'));
        this.app.use(this.paths.productos, require('../routes/producto'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        }); 
    }


    
}

module.exports = Server;
