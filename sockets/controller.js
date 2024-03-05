
const socketController = (socket) => {

    console.log("Cliente conectado", socket.id)    

    // Al desconectarse
    socket.on('disconnect', () => {

    })
    
    // Al enviar algun mensaje
    socket.on('enviar-mensaje', (payload, callback) => {

        const id = 123456
        callback(id) // Lo que se envia de vuelta al cliente que lo emite

        // Para mandar el mensaje a todos los clientes conectados menos el que lo emite
        socket.broadcast.emit('enviar-mensaje', payload)
    })
}

module.exports = {
    socketController
}