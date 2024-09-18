import mongoose from "mongoose";

const StudentSchema = mongoose.Schema(
    {
        student_name: String,
        phone_number: String,
        alternate_number: String,
        email_id: String,
        degree: String,
    }
)

export const Student = mongoose.model('student', StudentSchema)