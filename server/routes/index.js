const router = require('express').Router()

const login = require('./login')
const logout = require('./logout')
const register = require('./register')
const root = require('./root')

router.post('/login', login)
router.post('/logout', logout)
router.post('/register', register)
router.use('/', root)

module.exports = router
