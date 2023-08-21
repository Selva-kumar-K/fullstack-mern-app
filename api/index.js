import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('MongoDB Connected!')
}).catch((err) =>{
    console.log(err);
})

const app = express()

app.listen(3000, () => {
    console.log('Port listening on the localhost:3000');
})