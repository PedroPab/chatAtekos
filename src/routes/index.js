import express from "express";
const router = express.Router()
import path from "path";
import isLoogedIn from './../middlswares/isLoggedIn.js'

const __dirname = new URL('.', import.meta.url).pathname
const views = path.join(__dirname, './../views')

//tiene que tener una cookie de userName
router.get('/', isLoogedIn, (req, res) => {
  res.sendFile(views + '/index.html')
})

router.get('/register', (req, res) => {
  res.sendFile(views + '/register.html')
})

export default router