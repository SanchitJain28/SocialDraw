import express from 'express'
import { RunDatabase } from './db.js'
import { router as loginRouter } from './routes/login/route.js'
import { router as signUpRouter } from './routes/signUp/route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

RunDatabase()
const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json()); // Add this line to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Optional: for form data
app.use(loginRouter)
app.use(signUpRouter)

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})