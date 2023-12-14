import express from "express";
const router = express.Router()
import path from "path";
import isLoogedIn from './../middlswares/isLoggedIn.js'
import fs from 'fs'

const __dirname = new URL('.', import.meta.url).pathname
const views = path.join(__dirname, './../views')

//tiene que tener una cookie de userName
router.get('/', isLoogedIn, (req, res) => {
  res.sendFile(views + '/index.html')
})

router.get('/register', (req, res) => {
  res.sendFile(views + '/register.html')
})

router.get('/imgs', (req, res) => {
  const dirPublic = path.join(__dirname, './../public/img')

  // const directorio = './../public/img'; // Reemplaza 'tu_carpeta' con la ruta de la carpeta que desees listar

  // Lee el contenido de la carpeta
  fs.readdir(dirPublic, (err, archivos) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al listar archivos');
    } else {
      res.json(archivos);
    }
  });

})

export default router