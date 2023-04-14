const User = require('../model/usersModel')

const users_get = async(req, res) => {
    try {
        const user = await User.find({})
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports = {
    users_get
}