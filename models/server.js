/* eslint-disable class-methods-use-this */
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../config/config');
const routes = require('../routes');
const { swaggerDocs: V1SwaggerDocs } = require('../swagger');

require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.middleware();
    // Rutas
    this.routes();

    // Error middleware
    this.errorMiddleware();

    this.conectarDB();
  }

  async conectarDB() {
    await dbConnection();
  }

  // middleware
  middleware() {
    // cors
    this.app.use(cors());

    // directorio publico
    this.app.use(express.static('public'));

    // lectura y parseo del body
    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use('/api', routes);
  }

  errorMiddleware() {
    this.app.use((err, req, res, next) => {
      console.log('ERROR');
      console.log(err);
      res.status(500).send('An error has ocurred');
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      V1SwaggerDocs(this.app, this.port);
      console.log(`Prode app listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
