const mongoose = require('../libs/mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const config = require('config')

const db = mongoose.connection

module.exports = session({
    secret: config.get('secret'),
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: db}),
    cookie: {
        expires: new Date(Date.now() + 3600 * 1000), // 1 hour
    }
})
