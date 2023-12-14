
import { Server } from "socket.io"

const server = (httpServer) => {
  const io = new Server(httpServer)

  io.on('connection', socket => {

    socket.on('message', (data) => {
      const cookie = socket.handshake.headers.cookie
      const user = cookie.split('=').pop()
      //enviamos el mensage a todo los conectados
      io.emit('message', {
        user: user,
        message: data.message,
        time: new Date().toLocaleTimeString()
      })
    })



  })
}

export default server