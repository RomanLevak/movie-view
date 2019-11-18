const {
    get,
    getById,
    getAllListsFromUser,
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

router.get('/latest', get)
router.get('/latest/:page', get)

router.route('/')
    .post(checkAuth, create)

router.route('/:id')
    .get(checkId, getById)
    .put(checkId, checkOwner, update)
    .delete(checkId, checkOwner, remove)

router.route('/:id/:movieId')
    .put(checkId, checkOwner, addMovie)
    .delete(checkId, checkOwner, removeMovie)

router.get('/user/:userId', getAllListsFromUser)

module.exports = router
