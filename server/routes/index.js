const lists = require('./lists')
const user = require('./user')
const notFound = require('./not-found')

const router = require('express').Router()

router.use('/user', user)
router.use('/lists', lists)

router.use(notFound)

module.exports = router
