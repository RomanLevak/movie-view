const config = require('config')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser(config.get('secret')))

app.use((req, res) => {
    res.cookie('name', 'express').send({success: true})
})

module.exports = app
