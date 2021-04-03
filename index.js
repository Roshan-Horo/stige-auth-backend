import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import { notFound, errorHandler} from './middleware/errorMiddleware.js'

import authRoute from './routes/authRoutes.js'

// config
const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())

// connect to database
connectDB()

// Routes
app.get("/", (req,res) => {
    res.send("Home Page")
})

app.use("/api/auth", authRoute)

app.use(notFound)
app.use(errorHandler)

// PORT
const PORT = process.env.PORT

app.listen(PORT,() => console.log(`App running in ${process.env.NODE_ENV} mode on PORT ${PORT}`))