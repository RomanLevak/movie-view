const LocalStrategy = require('passport-local')
const User = require('../../../models/user')

module.exports = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async function(email, password, done) {
        try {
            const user = await User.findOne({email})

            if(!user)
                return done(null, false,  'such user does not exist')

            const isValidPassword = await user.checkPassword(password)

            if(!isValidPassword)
                return done(null, false,  'incorrect password')

            return done(null, user,  'Welcome !')
        } catch (err) {
            console.error(err)
            done(err)
        }
    }
)
