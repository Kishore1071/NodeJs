import express from 'express'
import { Order, OrderProduct } from "./ordersModel.js";
import { Product } from '../products/productModel.js';

const OrderRouter = express.Router()

OrderRouter.get('/', async (request, response) => {

    const orders = await Order.find({})

    let all_orders = []

    for (let order_ident of orders) {

        const product_data = await OrderProduct.find({order: order_ident._id})

        const single_order_data = [
            order_ident,
            product_data
        ]

        all_orders.push(single_order_data)
    }

    response.json(all_orders)
})

OrderRouter.get('/:id/', async(request, response) => {

    const {id} = request.params

    const orders = await Order.findById(id)

    const product_data = await OrderProduct.find({order: orders._id})

    const response_data = [
        orders,
        product_data
    ]

    response.json(response_data)
})

OrderRouter.post('/', async(request, response) => {

    const order_details = request.body[0]
    const order_product = request.body[1]
    
    const new_order = Order(order_details)

    await new_order.save()

    let grand_total = 0

    for (let x of order_product) {

        const product_data = await Product.findById(x.product)

        const product_amount = product_data.price * x.quantity

        const product_gst = (product_amount * product_data.gst) / 100

        const product_subtotal = product_amount + product_gst
    
        grand_total = grand_total + product_subtotal

        const new_order_product = OrderProduct({
            product: x.product,
            order: new_order._id,
            quantity: x.quantity,
            amount: product_amount,
            gst_amount: product_gst,
            sub_total: product_subtotal
        })

        await new_order_product.save()

    }

    await Order.findByIdAndUpdate(new_order._id,  {
        bill_amount: grand_total
    })

    response.json("Data Saved")
})

OrderRouter.patch('/:id/', async (request, response) => {

    const {id} = request.params
    const order_details = request.body[0]
    const order_product = request.body[1]

    await Order.findByIdAndUpdate(id, order_details)

    for (let x of order_product) {
        
        if (x.new === true) {
            //
        }
        else if (x.update === true) {
            //
        }
        else if (x.delete === true) {
            //
        }
    }


})

OrderRouter.delete('/:id/', async (request, response) => {

    const {id} = request.params

    const orders = await Order.findById(id)

    const product_data = await OrderProduct.find({order: orders._id})

    for (let x of product_data) {

        await OrderProduct.findByIdAndDelete(x._id)
    }

    await Order.findByIdAndDelete(id)

    response.json("Order Deleted")
})

export default OrderRouter
