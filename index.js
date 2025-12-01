import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/config/db.js'
import errorMiddleware from './src/middleware/errorMiddleware.js'
import router from './src/routes/authRoutes.js'
import corsOptions from './src/config/cors.js'

const app = express()
dotenv.config({ path: ".env" })
await connectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorMiddleware)
app.use('/api', router)

app.listen(process.env.PORT, () => {
    console.log(`The server is running on http://localhost:${process.env.PORT}`)
})