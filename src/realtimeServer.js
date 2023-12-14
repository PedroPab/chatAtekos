
import { Server } from "socket.io"

const server = (httpServer) => {
  const io = new Server(httpServer)

  io.on('connection', socket => {

    socket.on('message', (data) => {
      //organisamos las cookies
      const cookieString = socket.handshake.headers.cookie
      const cookiesList = cookieString.split('; ');
      const cookies = {}
      cookiesList.forEach(elment => {
        const keyValue = elment.split('=')
        cookies[keyValue[0]] = keyValue[1]
      })

      const user = cookies.userName
      const userImg = cookies.userImg
      //enviamos el mensage a todo los conectados
      io.emit('message', {
        user: user,
        message: data.message,
        time: new Date().toLocaleTimeString(),
        img: userImg,
      })
    })



  })
}

export default server