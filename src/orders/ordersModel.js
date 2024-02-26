import mongoose from "mongoose";
import { Customer } from "../customers/customerModel.js";

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