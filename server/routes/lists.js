const listController = require('../handlers/controllers/lists')
const checkIfValidId = require('../handlers/check-if-valid-id')
const router = require('express').Router()

router.get('/', listController.get)

router.route('/:id')
    .get(checkIfValidId, listController.get)
    .post(checkIfValidId, listController.post)
    .put(checkIfValidId, listController.put)
    .delete(checkIfValidId, listController.delete)

module.exports = router
