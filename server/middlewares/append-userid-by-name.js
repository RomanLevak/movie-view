const ah = require('../libs/async-handler')
const HTTPError = require('../libs/http-error')
const User = require('../models/user')

const appendId = ah(async (req, res, next) => {
    const userName = req.params.userName
    if(!userName)
        return next(new HTTPError(400, 'please provide a userName'))

    const userId = await User.getIdByName(userName)

    if(!userId)
        return next(new HTTPError(404, 'such user does not exist'))

    req.params.userId = userId
    next()
})

module.exports = appendId
