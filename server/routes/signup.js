const { Router } = require('express')
const { signup_post } = require('../controllers/authControllers')
const router = Router()

router.post('/', signup_post )

module.exports = router