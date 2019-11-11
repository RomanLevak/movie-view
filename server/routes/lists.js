const listController = require('../middlewares/controllers/lists')
const {checkAuth} = require('../middlewares/controllers/user')
const checkIfValidId = require('../middlewares/check-if-valid-id')
const router = require('express').Router()

router.route('/')
    .get(listController.get)
    .post(checkAuth, listController.post)

router.route('/:id')
    .get(checkIfValidId, listController.get)
    .post(checkIfValidId, checkAuth, listController.post)
    .put(checkIfValidId, listController.checkOwner, listController.put)
    .delete(checkIfValidId, listController.checkOwner, listController.delete)

module.exports = router
