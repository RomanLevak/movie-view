const {
    getLatest,
    getById,
    getListsByUserId,
    create,
    update,
    remove,
    addMovie,
    removeMovie,
    checkOwner
} = require('../controllers/lists')
const {checkAuth} = require('../controllers/user')
const checkId = require('../middlewares/check-id')
const appendUserIdByName = require('../middlewares/append-userid-by-name')

const router = require('express').Router()

router.get('/latest', getLatest)
router.get('/latest/:page', getLatest)

router.route('/')
    .post(checkAuth, create)

router.route('/:id')
    .get(checkId, getById)
    .put(checkId, checkOwner, update)
    .delete(checkId, checkOwner, remove)

router.route('/:id/:movieId')
    .put(checkId, checkOwner, addMovie)
    .delete(checkId, checkOwner, removeMovie)

router.get('/user/:userId', getListsByUserId)
router.get(
    '/username/:userName',
    appendUserIdByName,
    getListsByUserId
)

module.exports = router
