import express from 'express'
import { Course } from './courseModel.js'

const CourseRouter = express.Router()

CourseRouter.get('/', async(request, response) => {
    
    const all_course = await Course.find({})

    response.json(all_course)
})

CourseRouter.get('/:id/', async(request, response) => {

    const {id} = request.params

    const course = await Course.findById(id)

    response.json(course)

})

CourseRouter.post('/', async(request, response) => {

    const new_course = new Course(request.body)

    await new_course.save()

    response.json({
        status: true,
        message: "Data Saved"
    })

})

CourseRouter.patch('/:id/', async(request, response) => {

    const {id} = request.params

    await Course.findByIdAndUpdate(id, request.body)

    response.json({
        status: true,
        message: "Data Updated"
    })
})

CourseRouter.delete('/:id/', async(request, response) => {

    const {id} = request.params

    await Course.findByIdAndDelete(id)

    response.json({
        status: true,
        message: "Data Deleted"
    })
})

export default CourseRouter