module.exports = (req, res) => {
    if(req.isAuthenticated())
        res.json({user: {email: req.user.email}})
    else
        res.json({user: false})
}
