module.exports = async function(req, res) {
    req.logout()
    res.json({message: 'you are logged out', user: false})
}
