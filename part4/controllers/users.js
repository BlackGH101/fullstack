const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/userDB')
const Blog = require('../models/blogDB')
const jwt = require('jsonwebtoken')


userRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    const saltRounds = 10
    const passwordhash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordhash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)

})

userRouter.get('/', async (request, response) => {

    const allUsers = await User.find({}).populate('notes', {title: 1, author: 1} )

    response.json(allUsers)
})


userRouter.get('/:id', async (request, response) => {
    const returnedUser = await User.findById(request.params.id)

    if(!returnedUser){
        response.status(404).json({
            error: 'User does not exist'
        })
    }

    response.json(returnedUser)
})

userRouter.delete('/:id', async (request, response) => {
    const deletedUser = await User.findByIdAndDelete(request.params.id)

    if(!deletedUser){
        response.status(404).json({
            error: 'resource does not exist'
        })
    }
    response.status(201).end()
})


module.exports = userRouter