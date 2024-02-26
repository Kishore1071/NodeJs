import express from 'express'
import { Order } from "./ordersModel.js";

const OrderRouter = express.Router()

OrderRouter.get('/', async(request, response) => {

    const orders = await Order.find({})

    response.json(orders)
})

OrderRouter.post('/', async(request, response) => {

    console.log(request.body)
    
    const new_order = Order(request.body)

    await new_order.save()

    response.json(new_order)
})

export default OrderRouter
