import express, { json, urlencoded } from 'express'
import { set, connect } from 'mongoose'
import { config } from 'dotenv'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import CustomerRouter from './customers/customerRoutes.js'
import ProductRouter from './products/productRoutes.js'
import OrderRouter from './orders/ordersRoutes.js'
import UserRouter from './authentication/userRouter.js'

const app = express()

app.use(json())
app.use(urlencoded({extended: true}))
app.use(cors())

// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))

config()
set('strictQuery', false)

const PORT = process.env.PORT
const mongoose_connection = process.env.connection

app.use('/customers/', CustomerRouter)
app.use('/products/', ProductRouter)
app.use('/orders/', OrderRouter)
app.use('/user/', UserRouter)

const start = async () => {
    await connect(`${mongoose_connection}`)
    app.listen(PORT, () => console.log(`listen on the port ${PORT}`))
}

start()