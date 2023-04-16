const { Router } = require('express')
const { users_get, users_put } = require('../controllers/userControllers')
const router = Router()


router.get('/', users_get)
router.put('/:id', users_put)

module.exports = router