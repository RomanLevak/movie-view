const HTTPError = require('../libs/httperror')

module.exports = (err, req, res, next) => {
    if(typeof err == 'number')  // next(401)
        err = new HTTPError(err)

    if(err instanceof HTTPError)
        res.status(err.status).json({message: err.message})
    else
        res.status(500).send('Internal server error')
}
