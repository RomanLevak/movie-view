module.exports = {
    secret: process.env.SECRET || 'mysecret',
    server: {
        host: 'http://localhost',
        port: 3000,
    },
    mongodb: {
        uri: 'mongodb://localhost/movieview'
    },
    crypto: {
        hash: {
            length: 128,
            iterations: 10
        }
    },
    passwordRegExp: /^.{4,200}$/
}
