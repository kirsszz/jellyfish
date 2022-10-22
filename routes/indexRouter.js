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

module.exports = router;