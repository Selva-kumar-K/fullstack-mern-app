import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('MongoDB Connected!')
}).catch((err) =>{
    console.log(err);
})

const app = express()
app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success : false,
        message,
        statusCode
    })
})

app.listen(3000, () => {
    console.log('Port listening on the localhost:3000');
})