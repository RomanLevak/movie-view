const User = require('../models/user')
const List = require('../models/list')
const users = require('./users')
const lists = require('./lists')

async function fillDB() {
    try {
        await User.deleteMany()
        await List.deleteMany()

        for(let user of users) {
            const u = new User(user)
            await u.setPassword(user.password)
            await u.save()
        }

        for(let list of lists) {
            const l = new List(list)
            const u = await User.findOne({email: list.userEmail})
            l.user = u._id
            await l.save()
        }

        console.log(`${users.length} users and ${lists.length} lists have been saved in DB`)
    } catch (err) {
        console.error(err)
    }
}

fillDB()
