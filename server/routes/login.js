const passport = require('../libs/passport')

module.exports = async(req, res, next) => {
    await passport.authenticate('local', async function(err, user, message) {
        if(err) return next(err)

        if(user) {
            req.login(user, err => {
                if(err) return next(err)
                res.json({message, user: {email: user.email}})
            })
        } else {
            res.status(401).json({message})
        }
    })(req, res, next)
}
