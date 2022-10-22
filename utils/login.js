const passport = require('passport');
const passportCustom = require('passport-custom');
const CustomStrategy = passportCustom.Strategy;
const { findUserFromDB } = require('./db');
const bcrypt = require('bcrypt');

passport.use('customAuth', new CustomStrategy(
    async function (req, done) {
        try {
            const { username, password } = req.body;
            //find user from db
            //if found, check password
            const foundUser = findUserFromDB(username);

            if (foundUser.length === 0) {
                throw new Error('no users found');
            } else {
                bcrypt.compare(password, foundUser[0].password, function (err, result) {
                    // result == true
                    if (err) {
                        throw new Error(err);
                    }
                    if (!result) {
                        throw new Error('wrong password');
                    }
                });
            }

            const userObject = {
                username
            };

            return done(null, userObject)

        } catch (e) {
            return done(null, null)
        }
    }
));

passport.serializeUser(function (userObject, done) {
    done(null, userObject);
});

passport.deserializeUser(async function (userObject, done) {
    done(null, userObject);
});

module.exports = passport;