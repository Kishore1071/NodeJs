import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema(
    {
        customer_name: {
            type: String,
            required: true
        },
        company_name: {
            type: String,
            required: true
        },
        member_since: {
            type: String,
            required: true
        },
        phone_number: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Customer = mongoose.model('Customer', CustomerSchema)