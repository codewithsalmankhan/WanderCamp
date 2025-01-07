module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Please sign in to access this page')
        return res.redirect('/login')
    }
    next();
};