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
        }
    }
)

export const Order = mongoose.model('Order', OrderSchema)