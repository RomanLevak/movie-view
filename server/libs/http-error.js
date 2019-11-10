const http = require('http')

class HTTPError extends Error {
    constructor(status, message) {
        super(status, message)

        Error.captureStackTrace(this, HTTPError)

        this.status = status
        this.message = message || http.STATUS_CODES[status] || 'Error'
    }
}

HTTPError.prototype.name = 'HTTPError'

module.exports = HTTPError
