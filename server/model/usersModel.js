const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    username: String
}, { timestamps:true })

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)

    next()
})

userSchema.statics.login = async function(username, password){
    const user = await this.findOne({ username })
       
    if (user) {
        const auth = await bcrypt.compare(password, user.password)

        if (auth) {
            return user
        }
        throw Error('Incorrect username')
    }
    throw Error
}

const User = new model('user', userSchema)
module.exports = User