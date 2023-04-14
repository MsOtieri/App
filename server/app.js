const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cors())
app.use(express.json())
app.use(cookieParser())

const signupRoute = require('./routes/signup')
const signinRoute = require('./routes/signin')
const usersRoute = require('./routes/users')


app.use('/signup', signupRoute)
app.use('/signin', signinRoute)
app.use('/users', usersRoute)

module.exports = app