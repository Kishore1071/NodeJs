import express from 'express'
import { User } from './userModel.js'

const UserRouter = express.Router()

UserRouter.post('/create/', async (request, response) => {

    const all_user = await User.find({})

    const {username} = request.body

    const user_check = all_user.find(user => user.username === username)

    if (user_check === undefined) {
        
        const new_user = new User(request.body)

        await new_user.save()

        response.json("User Created")
    }

    else {
        response.json("User with the usename already exists!")
    }
})


export default UserRouter