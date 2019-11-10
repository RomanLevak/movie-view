module.exports = async (req, res, next) => {
    req.logout()
    res.json({message: 'you are logged out', user: false})
}
