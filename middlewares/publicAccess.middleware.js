function publicAccess(req,res,next) {
    const user = req.session.user
    if(user) return res.redirect('/')

next()

}

module.exports = publicAccess;