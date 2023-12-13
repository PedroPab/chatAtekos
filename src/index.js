import express from "express";
import { createServer } from 'http'
import path from "path";
import { Server } from 'socket.io'
import { URL } from 'url';
import realtimeServer from './realtimeServer.js'
import routes from './routes/index.js'


const app = express()
const httpServer = createServer(app)


//settings
app.set('port', process.env.PORT || 3006)

const __dirname = new URL('.', import.meta.url).pathname
app.set('views', path.join(__dirname, 'views'))


//routes
app.use(routes)

//public
app.use(express.static(path.join(__dirname, 'public')))

//levantando servirdor
httpServer.listen(app.get('port'), () => {
  console.log(`El servidor esta corriendo: http://localhost:${app.get('port')}`)

})


//llamamso al serviero de socket.io
realtimeServer(httpServer)