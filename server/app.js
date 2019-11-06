const config = require('config')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('./handlers/session')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser(config.get('secret')))
app.use(session)

app.use((req, res) => {
    if(req.session.counter)
        req.session.counter = req.session.counter + 1
    else
        req.session.counter = 1

    res.send({counter: req.session.counter})
})

module.exports = app
