module.exports = async (req, res, next) => {
    req.logout()
    res.json({user: false})
}
