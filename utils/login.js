const passport = require('passport');
const passportCustom = require('passport-custom');
const CustomStrategy = passportCustom.Strategy;
const { findUser } = require('./db');
const bcrypt = require('bcrypt');

function checkPassword(password, dbPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, dbPassword, function (err, result) {
            // result == true
            if (err) {
                return reject(err);
            }
            if (!result) {
                return reject('Wrong password');
            } else {
                return resolve(result);
            }
        });
    });
}

passport.use('customAuth', new CustomStrategy(
    async function (req, done) {
        try {
            const { username, password } = req.body;
            //find user from db
            //if found, check password
            const foundUser = await findUser(username);

            if (foundUser.length === 0) {
                throw new Error('No users found');
            } else {
                await checkPassword(password, foundUser[0].password);
                const userObject = {
                    username
                };

                return done(null, userObject);
            }
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