const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register')
};

module.exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Wander Camp!')
            res.redirect('/campgrounds')
        })
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('register')
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
};

module.exports.loginUser = async (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged out successfully!');
        res.redirect('/campgrounds');
    });
};