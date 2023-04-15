const User = require('../model/usersModel')
const jwt = require('jsonwebtoken')
const { SECRET } = process.env

const maxAge = 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, SECRET, {
        expiresIn: maxAge,
    })
}

const signup_post = async(req, res) => {
    const { person_name, email, password, username } = req.body

    try {
        const user = await User.create({
            name: person_name, email, password, username
        })

        const token = createToken(user._id)

        res.cookie('jwt', token, {
            domain: 'chamaa.onrender.com',
            path: '/',
            maxAge: maxAge * 1000, // 1 day
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
          })
        
        res.status(201).json({user: user._id})

    } catch (error) {
        res.send(error.message)
    }
    
}

const signin_post = async(req, res) => {
    const { username, password } = req.body
  
    try {
        const user = await User.login(username, password)
        res.status(200).json({ user: user._id})

        // console.log(user)

    } 
    catch (error) {
        res.status(401).json({message: "Invalid login credentials"})
    }

    
    
}

module.exports = {
    signup_post,
    signin_post,
}