const { Router } = require('express')
const { signin_post } = require('../controllers/authControllers')
const router = Router()


router.post('/', signin_post)

module.exports = router