const HTTPError = require('../libs/http-error')

module.exports = (err, req, res, next) => {
    if(typeof err == 'number')  // next(401)
        err = new HTTPError(err)

    const {message} = err

    res.statusMessage = message

    if(err instanceof HTTPError)
        res.status(err.status).send({message: err.message})
    else
        res.status(500).send('Internal server error')
}
