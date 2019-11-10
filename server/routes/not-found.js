const HTTPError = require('../libs/http-error')

module.exports = (req, res, next) =>
    next(new HTTPError(404))
