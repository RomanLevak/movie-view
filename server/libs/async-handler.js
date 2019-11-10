// will catch a rejected promise from await statement
module.exports = fn => (req, res, next) =>
    Promise
        .resolve(fn(req, res, next))
        .catch(err => {
            console.log(err)
            next(err)
        })
