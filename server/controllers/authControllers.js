const User = require('../model/usersModel')
const jwt = require('jsonwebtoken')
const { SECRET } = process.env

const maxAge = 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, SECRET, {
        expiresIn: maxAge,
    })
}

const sendJWTCookie = (res, token) => {
    const cookieOptions = {
        expiresIn: maxAge * 10000,
        httpOnly: true
    }

    res.cookie('jwt', token, cookieOptions)
}

const signup_post = async(req, res) => {
    const { person_name, email, password, username } = req.body

    try {
        const user = await User.create({
            name: person_name, email, password, username
        })

        const token = createToken(user._id)

        // generate jwt cookie and send
        sendJWTCookie(res, token)
        
        // const decoded = jwt.verify(token, SECRET)
        

        res.status(201).json({user: user._id})

    } catch (error) {
        res.send(error.message)
    }
  
}


const signin_post = async(req, res) => {
    const { username, password } = req.body
  
    try {
        const user = await User.login(username, password)
        res.status(200).json({user: user._id})

    } 
    catch (error) {
        res.status(401).json({message: "Invalid login credentials"})
    } 
    
}


module.exports = {
    signup_post,
    signin_post,
}