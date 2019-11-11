const {
    get,
    create,
    update,
    remove,
    checkOwner
} = require('../middlewares/controllers/lists')
const {checkAuth} = require('../middlewares/controllers/user')
const checkId = require('../middlewares/check-id')

const router = require('express').Router()

router.route('/')
    .get(get)
    .post(checkAuth, create)

router.route('/:id')
    .get(checkId, get)
    .put(checkId, checkOwner, update)
    .delete(checkId, checkOwner, remove)

module.exports = router
