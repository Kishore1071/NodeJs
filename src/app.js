const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.port
const mongoose_connection = process.env.connection

const start = async () => {
    await mongoose.connect(`${mongoose_connection}`)
    app.listen(PORT, () => console.log("listen on the port 4000"))
}

start()
