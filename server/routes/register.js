const User = require('../models/user')
const HTTPError = require('../libs/httperror')

module.exports = async function(req, res, next) {
    const {email, password} = req.body

    if(!email)
        return next(new HTTPError(400, 'please provide an email'))

    if(!password)
        return next(new HTTPError(400, 'please provide a password'))

    const existEmail = await User.findOne({email})

    if(existEmail)
        return next(new HTTPError(400, 'such email already registred'))

    try {
        const user = new User({email})

        await user.setPassword(password)
        await user.save()

        res.status(201).json({user: {email: user.email}})
    } catch (err) {
        return next(err)
    }
}
