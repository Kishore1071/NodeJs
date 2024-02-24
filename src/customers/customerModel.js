import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema(
    {
        customer_name: {
            type: String,
            required: true
        },
        industry: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Customer = mongoose.model('Customer', CustomerSchema)