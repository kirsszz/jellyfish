const express = require('express');
const { saveUser } = require('../utils/db');
const router = express.Router();
const passport = require('../utils/login');
const validator = require('../utils/validators');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                return reject(err)
            }
            resolve(hash)
        });
    });
}


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
        const hashedPw = await hashPassword(password);
        await saveUser(username, hashedPw);

        req.flash('success', 'User is successfully registered');
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