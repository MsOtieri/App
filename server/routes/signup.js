const { Router } = require('express')
const { signup_post, signup_get } = require('../controllers/authControllers')
const router = Router()

router.post('/', signup_post )
router.get('/', signup_get)

module.exports = router