import mongoose from "mongoose";

const CourseSchema = mongoose.Schema(
    {
        course_name: String,
        duration: String
    }
)

export const Course = mongoose.model('course', CourseSchema)