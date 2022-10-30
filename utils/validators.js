const { body, validationResult } = require('express-validator');
const passwordValidator = require('password-validator');
const schema = new passwordValidator();

schema
    .is().min(8)                                    // Minimum length 8                                 // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports.signin = [
    body('username').isLength({ min: 3 }).escape().trim(),
    body('password').isLength({ min: 8 }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.redirect('/signin');
        }
        next();
    }
];
module.exports.register = [
    body('username').isLength({ min: 3, max: 50 }).escape().trim().withMessage('Userame must be atleast 3 characters and max 50 characters long'),
    body('password').escape().custom((value, { req }) => {
        if (!schema.validate(value)) {
            throw new Error('Password must meet complexity requirements');
        } else {
            if (value !== req.body.repeatPassword) {
                throw new Error('Passwords must match');
            }
            return true;
        }
    }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors.errors[0])
            req.flash('error', errors.errors[0].msg);
            return res.redirect('/register');
        }
        next();
    }
];
