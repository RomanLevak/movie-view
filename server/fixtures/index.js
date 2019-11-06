const User = require('../models/user')
const users = require('./users')

async function fillDB() {
    try {
        await User.deleteMany()

        for(let user of users) {
            const u = new User(user)
            await u.setPassword(user.password)
            await u.save()
        }

        console.log(`${users.length} users have been saved in DB`)
    } catch (err) {
        console.error(err)
    }
}

fillDB()
