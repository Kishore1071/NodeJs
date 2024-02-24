import express, { json, urlencoded } from 'express'
import { set, connect } from 'mongoose'
import { config } from 'dotenv'
import CustomerRouter from './customers/customerRoutes.js'
import ProductRouter from './products/productRoutes.js'

const app = express()

app.use(json())
app.use(urlencoded({extended: true}))

config()
set('strictQuery', false)

const PORT = process.env.port
const mongoose_connection = process.env.connection

app.use('/customers/', CustomerRouter)
app.use('/products/', ProductRouter)

const start = async () => {
    await connect(`${mongoose_connection}`)
    app.listen(PORT, () => console.log(`listen on the port ${PORT}`))
}

start()
