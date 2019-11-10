const passport = require('../libs/passport')
const HTTPError = require('../libs/http-error')

module.exports = async (req, res, next) => {
    await passport.authenticate(
        'local',
        async function(err, user, message) {
            if(err) return next(err)

            if(user) {
                req.login(user, err => {
                    if(err) return next(err)
                    res.json({message, user: {email: user.email}})
                })
            } else
                return next(new HTTPError(401, message))
        })(req, res, next)
}
