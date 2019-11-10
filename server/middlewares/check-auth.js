const HTTPError = require('../libs/httperror')

module.exports = (req, res, next) => {
    if(req.isAuthenticated())
        return next()
    else
        return next(new HTTPError(401))
}
