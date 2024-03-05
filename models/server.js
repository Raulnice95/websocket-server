const express = require('express')
const cors = require('cors')
const { socketController } = require('../sockets/controller')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.server = require('http').createServer( this.app )
        this.io = require('socket.io')( this.server ) // Informacion de los sockets / clientes conectados

        this.paths = {}

        // Middlewares
        this.middlewares()

        // Rutas de mi aplicacion
        this.routes()

        // Configuracion de sockets
        this.sockets()
    }

    middlewares() {

        // CORS. Para proteger los origenes de las peticiones a backend
        this.app.use( cors() )

        // Directrio publico
        this.app.use( express.static('public') )

    }

    routes() {}

    sockets() {
        // Durante la conexion
        this.io.on('connection', socketController)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port)
        })
    }

}

module.exports = Server;