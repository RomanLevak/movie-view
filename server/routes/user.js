const {
    login,
    logout,
    register,
    checkAuth
} = require('../middlewares/controllers/user')

const router = require('express').Router()

router.post('/login', login)
router.post('/logout', logout)
router.post('/register', register)
router.get('/check-auth', checkAuth)

module.exports = router
