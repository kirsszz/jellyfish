const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.render('login')
});

router.post('/signin', (req, res) => {
    const { username, password } = req.body;

    res.redirect('/')
});

module.exports = router;