const User = require('../models/user')
const HTTPError = require('../libs/http-error')
const ah = require('../libs/async-handler')

module.exports = ah(async (req, res, next) => {
    const {email, password, displayName} = req.body

    if(!email)
        return next(new HTTPError(400, 'please provide an email'))

    if(!password)
        return next(new HTTPError(400, 'please provide a password'))

    const existEmail = await User.findOne({email})

    if(existEmail)
        return next(new HTTPError(400, 'such email already registred'))

    const user = new User({email, password, displayName})

    await user.setPassword(password)
    await user.save()

    res.status(201).json(user.selectToSend(true))
})
