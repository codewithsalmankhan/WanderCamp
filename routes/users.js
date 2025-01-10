const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');

const { storeReturnTo } = require('../middleware');

//render register form
router.get('/register', (users.renderRegisterForm));

//register the user
router.post('/register', catchAsync(users.registerUser));

//renders the loginForm
router.get('/login', (users.renderLoginForm));

//login the user
router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (users.loginUser));

//logsout the user
router.get('/logout', (users.logoutUser));

module.exports = router;