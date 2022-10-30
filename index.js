require('dotenv').config()
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const session = require('express-session');
const i18next = require('i18next');
const cookieParser = require('cookie-parser');
const flash = require('req-flash');
const passport = require('./utils/login');

const indexRoutes = require('./routes/indexRouter');
const jellyRoutes = require('./routes/jellyRouter');
const { isLoggedIn } = require('./utils/middlewares');

const languages = require('./languages.json');

const port = process.env.PORT || 3000;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');

app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static('public'));

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.authenticate('session'));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


i18next.init({
    lng: 'en',
    resources: languages
});


app.use('/', indexRoutes);
app.use('/jelly', isLoggedIn, jellyRoutes);

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.error('ERROR', err);
    return res.send('Oh nooo... ')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});