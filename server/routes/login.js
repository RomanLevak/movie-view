const passport = require('../libs/passport')
const HTTPError = require('../libs/http-error')

const login = (req, res, next) =>
    passport.authenticate(
        'local',
        (err, user, message) => {
            if(err) return next(err)

            if(user)
                req.login(user, err => {
                    if(err) return next(err)

                    res.json(user.selectToSend(true))
                })
            else
                return next(new HTTPError(401, message))
        }
    )(req, res, next)

module.exports = login
