const router = require('express').Router()

const login = require('./login')
const logout = require('./logout')
const register = require('./register')
const checkAuth = require('./check-auth')
const notFound = require('./not-found')
const lists = require('./lists')

router.post('/login', login)
router.post('/logout', logout)
router.post('/register', register)
router.get('/check-auth', checkAuth)

router.use('/lists', lists)

router.use(notFound)

module.exports = router
