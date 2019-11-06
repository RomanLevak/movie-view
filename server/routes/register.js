const User = require('../models/user')

module.exports = async function(req, res, next) {
    const {email, password} = req.body

    if(!email)
        return res.status(400).json({message: 'please provide an email', user: false})
    if(!password)
        return res.status(400).json({message: 'please provide a password', user: false})

    const existEmail = await User.findOne({email})

    if(existEmail)
        return res.json({message: 'such email already registred', user: false})

    try {
        const user = new User({email})

        await user.setPassword(password)
        await user.save()

        res.json({user: {email: user.email}})
    } catch (err) {
        return next(err)
    }
}
