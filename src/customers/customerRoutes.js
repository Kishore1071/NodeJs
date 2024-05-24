import express from 'express'
import { Customer } from './customerModel.js'
import { authentication } from '../authentication/authentication.js'

const CustomerRouter = express.Router()

CustomerRouter.get('/', async (request, response) => {

    let customer_list = await Customer.find({})

    response.json({
        status: true,
        customer_data: customer_list
    })
})

CustomerRouter.get('/:id/', authentication , async (request, response) => {

    const {id} = request.params
    let customer_list = await Customer.findById(id)

    response.json({
        status: true,
        customer_data: customer_list
    })
})

CustomerRouter.post('/', async(request, response) => {

    const new_customer = new Customer(request.body)
    await new_customer.save()

    console.log(new_customer._id)

    response.json({
        status: true,
        message: "Data Saved",
        customer_data: new_customer
    })
})

CustomerRouter.patch('/:id/', async(request, response) => {

    const {id} = request.params
    await Customer.findByIdAndUpdate(id, request.body)
    const customer = await Customer.findById(id)

    response.json({
        status: true,
        message: "Data Updated",
        customer_data: customer
    })
})

CustomerRouter.delete('/:id/', async(request, response) => {

    const {id} = request.params
    console.log(id)
    await Customer.findByIdAndDelete(id)

    response.json({
        status: true,
        message: "Data Deleted",
    })
})

export default CustomerRouter