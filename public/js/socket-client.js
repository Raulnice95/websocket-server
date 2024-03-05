// Referencias al HTML
const lblOnline = document.getElementById('lblOnline')
const lblOffline = document.getElementById('lblOffline')
const txtMensaje = document.getElementById('txtMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const socket = io()

// Listeners al server
socket.on('connect', () => {
    console.log("Conectado")

    lblOffline.style.display = 'none'
    lblOnline.style.display = ''
})

socket.on('disconnect', () => {
    console.log("Desconectado del servidor")

    lblOffline.style.display = ''
    lblOnline.style.display = 'none'
})

// para recibir nuevos mensajes de todos los clientes
socket.on('enviar-mensaje', (payload) => {
    console.log(payload)
})

btnEnviar.addEventListener( 'click', () => {
    const mensaje = txtMensaje.value
    const payload = {
        mensaje,
        id: '1234',
        fecha: new Date().getTime()
    }
    // Tercer arg es el callback que recibimos desde el server
    socket.emit('enviar-mensaje', payload, ( id ) => {
        console.log("Desde el server", id)
    })
})