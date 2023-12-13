import express from "express";
const router = express.Router()
import path from "path";


const __dirname = new URL('.', import.meta.url).pathname
const views = path.join(__dirname, './../views')


router.get('/', (req, res) => {
  res.sendFile(views + '/index.html')
})

export default router