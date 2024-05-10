import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        },
        order_number: {
            type: String,
            required: true
        },
        order_date: {
            type: Date,
            required: true
        },
        bill_amount: Number,

    }
)

export const Order = mongoose.model('Order', OrderSchema)



const OrderProductSchema = mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        },
        quantity: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        gst_amount: {
            type: Number,
            required: true
        },
        sub_total: {
            type: Number,
            required: true
        }
    }
)

export const OrderProduct = mongoose.model('OrderProduct', OrderProductSchema)