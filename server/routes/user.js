const {
    login,
    logout,
    register,
    getSelf
} = require('../middlewares/controllers/user')

const router = require('express').Router()

router.post('/login', login)
router.post('/logout', logout)
router.post('/register', register)
router.get('/me', getSelf)

module.exports = router
