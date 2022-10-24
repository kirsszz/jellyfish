const express = require('express');
const { saveUser } = require('../utils/db');
const router = express.Router();
const passport = require('../utils/login');
const validator = require('../utils/validators');
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.get('/', (req, res) => {
    res.render('signin');
});

router.post('/signin', validator.signin, passport.authenticate('customAuth', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/jelly');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', validator.register, async (req, res, next) => {
    try {
        const { username, password } = req.body;
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                throw new Error(err);
            }
            try {
                await saveUser(username, hash);
            } catch (e) {
                throw new Error(e);
            }
        });

        res.redirect('/');
    } catch (e) {
        next(e);
    }
});

router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;