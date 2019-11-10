const User = require('../models/user')

module.exports = async (req, res, next) => {
    if(req.isAuthenticated()) {
        const user = await User
            .findById(req.session.passport.user)
            .select('email')

        res.json({user})
    }
    else
        return res.json({user: false})
}
