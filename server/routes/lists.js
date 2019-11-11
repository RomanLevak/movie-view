const {
    get,
    create,
    update,
    remove,
    addMovie,
    removeMovie,
    checkOwner
} = require('../controllers/lists')
const {checkAuth} = require('../controllers/user')
const checkId = require('../middlewares/check-id')

const router = require('express').Router()

router.route('/')
    .get(get)
    .post(checkAuth, create)

router.route('/:id')
    .get(checkId, get)
    .put(checkId, checkOwner, update)
    .delete(checkId, checkOwner, remove)

router.route('/:id/:movieId')
    .put(checkId, checkOwner, addMovie)
    .delete(checkId, checkOwner, removeMovie)

module.exports = router
