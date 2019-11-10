const isValidId = require('mongoose').Types.ObjectId.isValid
const HTTPError = require('../libs/http-error')

module.exports = (req, res, next) => {
    const {id} = req.params

    if(!id)
        return next(new HTTPError(400, 'Please provide an id'))

    if(!isValidId(id))
        return next(new HTTPError(400, 'Incorrect id'))

    next()
}
