import express from 'express'
import { Order, OrderProduct } from "./ordersModel.js";
import { Product } from '../products/productModel.js';
import { authentication } from '../authentication/authentication.js';

const OrderRouter = express.Router()

OrderRouter.get('/', async (request, response) =>  {

    const all_orders = await Order.find({})

    let result = []

    for (let data of all_orders) {

        const products_of_order = await OrderProduct.find({order: data._id})

        const single_order = [
            data,
            products_of_order
        ]

        result.push(single_order)
    }

    response.json(result)
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
    const product_details = request.body[1]

    console.log(order_details)
    console.log(product_details)

    const new_order = new Order(order_details)

    await new_order.save()

    let total_amount = 0

    for (let product_data of product_details) {

        const product_id_data = await Product.findById(product_data.product)

        const amount = product_data.quantity * product_id_data.price

        const gst_amount = (amount * product_id_data.gst) / 100

        const new_order_product = new OrderProduct({
            product_ref: product_data.product,
            order: new_order._id,
            quantity: product_data.quantity,
            amount: amount,
            gst_amount: gst_amount,
            sub_total: amount + gst_amount
        })

        total_amount = total_amount + (amount + gst_amount)

        await new_order_product.save()

    }

    await Order.findByIdAndUpdate(new_order._id, {bill_amount:total_amount})/

    response.json("Data Saved")
})


OrderRouter.patch('/:id/', async(request, response) => {

    const {id} = request.params

    // request.user.name

    const order_details = request.body[0]

    const product_details = request.body[1]

    await Order.findByIdAndUpdate(id, order_details)

    let total = 0

    for (let product_data of product_details) {

        if (product_data.new === true) {

            const product_id_data = await Product.findById(product_data.product)

            const amount = product_data.quantity * product_id_data.price

            const gst_amount = (amount * product_id_data.gst) / 100

            const new_order_product = new OrderProduct({
                product: product_data.product,
                order: id,
                quantity: product_data.quantity,
                amount: amount,
                gst_amount: gst_amount,
                sub_total: amount + gst_amount
            })

            total = total + (amount + gst_amount)

            await new_order_product.save()
        }

        else if (product_data.update == true) {

            const product_id_data = await Product.findById(product_data.product)

            const amount = product_data.quantity * product_id_data.price

            const gst_amount = (amount * product_id_data.gst) / 100

            await OrderProduct.findByIdAndUpdate(product_data._id, {
                quantity: product_data.quantity,
                amount: amount,
                gst_amount: gst_amount,
                sub_total: amount + gst_amount
            })

            total = total + (amount + gst_amount)
        }

        else if (product_data.delete == true) {

            await OrderProduct.findByIdAndDelete(product_data._id)
        }

        else {

            total = total + product_data.sub_total
        }
    }

    await Order.findByIdAndUpdate(id, {bill_amount: total})

    response.json("Data Updated")


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

