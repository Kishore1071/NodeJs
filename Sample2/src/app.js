const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const dotenv = require('dotenv')
dotenv.config()

// const cors = require('cors')
// app.use(cors())

const port = process.env.port
const mongoose_connection = process.env.connection

const Customer = require('./models/customers')
const Product = require('./models/products')

app.get('/customer/', async (request, response) => {
    const all_customers = await Customer.find()
    response.send({customers_data: all_customers})
})

app.get('/customer/:id/', async (request, response) => {
    const all_customers = await Customer.findById(request.params.id)
    response.send({customers_data: all_customers})
})

app.patch('/update/customer/:id/',async (request, response) => {
    const customer_id = request.params.id
    await Customer.replaceOne({_id: customer_id}, request.body)
    const all_customers = await Customer.findById(request.params.id)
    
    response.send({all_customers})
})

app.delete('/delete/customer/:id/', async (request, response) => {

    await Customer.findByIdAndDelete(request.params.id)
    response.send({message: "Deleted"})
})

app.post('/add/customer/', (request, response) => {

    const customer = new Customer({
        name: request.body.name,
        industry: request.body.industry
    })

    customer.save()
    
    response.send(customer)
})

app.post('/add/product/', async (request, response) => {

    const product = new Product(request.body)

    try {

        await product.save()
        response.json({product})
    }
    catch (error) {
        response.json({error})
    }

})

const start = async() => {

    await mongoose.connect(`${mongoose_connection}`)
    app.listen(port, () => console.log(`Serving on the port ${port}`))
}

start()