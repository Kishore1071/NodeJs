import express from 'express'
import { Student } from './studentModel.js'

const StudentRouter = express.Router()

StudentRouter.get('/', async(request, response) => {
    
    const all_studnets = await Student.find({})

    response.json(all_studnets)
})

StudentRouter.get('/:id/', async(request, response) => {

    const {id} = request.params

    const student = await Student.findById(id)

    response.json(student)
})

StudentRouter.post('/', async(request, response) => {

    const new_student = new Student(request.body)

    await new_student.save()

    response.json({
        status: true,
        message: "Data Saved"
    })
})

StudentRouter.patch('/:id/', async(request, response) => {

    const {id} = request.params

    await Student.findByIdAndUpdate(id, request.body)

    response.json({
        status: true,
        message: "Data Updated"
    })
})

StudentRouter.delete('/:id/', async(request, response) => {

    const {id} = request.params

    await Student.findByIdAndDelete(id)

    response.json({
        status: true,
        message: "Data Deleted"
    })
})

export default StudentRouter