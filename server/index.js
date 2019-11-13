const app = require('./app.js')
const config = require('config')

require('./fixtures')

const port = config.get('server.port')

app.listen(port, () =>
    console.log(`server is working on port: ${port}`)
)
