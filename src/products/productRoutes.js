import express from 'express'
import { Product } from './productModel.js'

const ProductRouter = express.Router()


ProductRouter.get('/', async (request, response) => {

    let product_list = await Product.find({})

    response.json({
        status: true,
        product_data: product_list
    })
})

ProductRouter.get('/:id/', async (request, response) => {

    const {id} = request.params
    let product_list = await Product.findById(id)

    response.json({
        status: true,
        product_data: product_list
    })
})

ProductRouter.post('/', async(request, response) => {

    const new_product = await Product.create(request.body)

    response.json({
        status: true,
        message: "Data Saved",
        product_data: new_product
    })
})

ProductRouter.patch('/:id/', async(request, response) => {

    const {id} = request.params
    await Product.findByIdAndUpdate(id, request.body)
    const product = await Product.findById(id)

    response.json({
        status: true,
        message: "Data Updated",
        product_data: product
    })
})

ProductRouter.delete('/:id/', async(request, response) => {

    const {id} = request.params
    await Product.findByIdAndDelete(id)

    response.json({
        status: true,
        message: "Data Deleted",
    })
})
export default ProductRouter