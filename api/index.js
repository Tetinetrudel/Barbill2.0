import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import userRoutes from './routes/user.route.js'

dotenv.config()

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connexion à la base de données réussie')
    })
    .catch((err) => {
        console.log(err)
    })

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.listen(port, () => {
    console.log(`Application fonctionnant sur le port ${port}`)
})

app.use('/api/user', userRoutes)
//app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Erreur de serveur interne'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})