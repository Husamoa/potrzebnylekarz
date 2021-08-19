module.exports = (req, res, next) => {
    if ( req.isAuthenticated() ) {
        next();
        return
    }
    // Redirect here if logged in successfully
    req.session.redirectTo = req.path;
    res.redirect('/profile')
};