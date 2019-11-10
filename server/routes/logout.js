module.exports = async function(req, res, next) {
    req.logout()
    res.json({message: 'you are logged out', user: false})
}
