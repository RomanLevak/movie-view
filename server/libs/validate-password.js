const config = require('config')

module.exports = password =>
    config
        .get('passwordRegExp')
        .test(password)
