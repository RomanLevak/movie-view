const HTTPError = require('../libs/httperror')

module.exports = (req, res, next) => {
    return next(new HTTPError(404))
}
