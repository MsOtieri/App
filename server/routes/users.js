const { Router } = require('express')
const { users_get } = require('../controllers/userControllers')
const router = Router()


router.get('/', users_get)

module.exports = router