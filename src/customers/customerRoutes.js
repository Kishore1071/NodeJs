import express from 'express'
import { Customer } from './customerModel.js'
import { GetAllData, GetSingleData, CreateData, UpdateData, DeleteData } from '../controllers/singleModels.js'
import { authentication } from '../authentication/authentication.js'

const CustomerRouter = express.Router()

CustomerRouter.get('/', async (request, response) => {

    response.json(await GetAllData(Customer))
})

CustomerRouter.get('/:id/' , async (request, response) => {
    
    response.json(await GetSingleData(Customer, request.params.id))
})

CustomerRouter.post('/', async(request, response) => {

    response.json(await CreateData(Customer, request.body))
})

CustomerRouter.patch('/:id/', async(request, response) => {

    response.json(await UpdateData(Customer, request.params.id, request.body))
})

CustomerRouter.delete('/:id/', async(request, response) => {

    response.json(await DeleteData(Customer, request.params.id))
})

export default CustomerRouter