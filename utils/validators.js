const { body } = require('express-validator');

module.exports.signin = [
    body('username').isLength({ min: 3 }).escape().trim(),
    body('password').isLength({ min: 8 }).escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.redirect('/signin');
        }
        next();
    }
];
