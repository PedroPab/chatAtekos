import express from "express";
import { createServer } from 'http'
import path from "path";
import { Server } from 'socket.io'
import { URL } from 'url';
import realtimeServer from './realtimeServer.js'
import routes from './routes/index.js'
// Importación dinámica de cookie-parser
import cookieParser from 'cookie-parser';
const app = express()
const httpServer = createServer(app)
import multer from 'multer';

//settings
app.set('port', process.env.PORT || 3006)

const __dirname = new URL('.', import.meta.url).pathname
app.set('views', path.join(__dirname, 'views'))

//user coookis
app.use(cookieParser());

//routes
app.use(routes)

//public
app.use(express.static(path.join(__dirname, 'public')))


// Configuración de Multer
// Define el destino y el nombre del archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img') // Asegúrate de que esta carpeta exista en tu proyecto
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
  }
});

const upload = multer({ storage: storage });

// Endpoint para cargar imágenes
app.post('/imgUser', () => {
  console.log(`hola`)
}, upload.single('image'), (req, res) => {
  try {
    console.log(`recibiendo una imagen `)

    res.send({ message: 'Archivo cargado con éxito', file: req.file });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//levantando servirdor
httpServer.listen(app.get('port'), () => {
  console.log(`El servidor esta corriendo: http://localhost:${app.get('port')}`)

})


//llamamso al serviero de socket.io
realtimeServer(httpServer)