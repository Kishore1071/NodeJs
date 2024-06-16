import express from 'express'
import { Order } from './orders/ordersModel.js'

const NewRouter = express.Router()


NewRouter.get('/', async (request, response) => {

    let currentDatetime = new Date();

    let previousDatetime = new Date(currentDatetime);
    previousDatetime.setDate(currentDatetime.getDate() - 6);

    const orders = await Order.find({order_date: {
        $gte: previousDatetime,
        $lte: currentDatetime,
    }})

    response.json(orders)

})

export default NewRouter