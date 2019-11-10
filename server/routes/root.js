module.exports = (req, res, next) => {
    if(req.isAuthenticated())
        res.json({user: {email: req.user.email}})
    else
        res.json({user: false})
}
