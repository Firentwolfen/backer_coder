function privateAccess(req,res,next) {
    const user = req.session.user
    if(!user) return res.redirect('/login');

next()

}

module.exports = privateAccess;