const express = require('express');
const router = express.Router();
const passport = require('../utils/login');
const validator = require('../utils/validators');


router.get('/', (req, res) => {
    res.render('login')
});

router.post('/signin', validator.signin, passport.authenticate('customAuth', { failureRedirect: '/signin' }), (req, res) => {
    res.redirect('/jelly')
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', validator.register, (req, res) => {
    res.redirect('/register');
});

router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;