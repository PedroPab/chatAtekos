
import { Server } from "socket.io"

const server = (httpServer) => {
  const io = new Server(httpServer)

  io.on('connection', () => {

  })
}

export default server