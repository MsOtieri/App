const User = require('../model/usersModel')

const users_get = async(req, res) => {
    try {
        const user = await User.find({})
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json(e)
    }
}

const users_put = async(req, res) => {
    // Update user by id
    const { id } = req.params;
    const { username, email } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, email },
        { new: true }
      );
      
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}

module.exports = {
    users_get,
    users_put
}