const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const Sequelize = require('sequelize');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();
        
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use('/api/v1/usuarios', require('../routes/usuarios'));
        this.app.use('/api/v1/comentarios', require('../routes/comentarios'));
        this.app.use('/api/v1/ofertaIntercambios', require('../routes/ofertaIntercambios'));
        this.app.use('/api/v1/intercambios', require('../routes/intercambios'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;