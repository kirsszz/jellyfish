require('dotenv').config()
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const session = require('express-session');

const indexRoutes = require('./routes/indexRouter');
const jellyRoutes = require('./routes/jellyRouter');
const { isLoggedIn } = require('./utils/middlewares');

const port = process.env.PORT || 3000;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');

app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use('/', indexRoutes);
app.use('/jelly', isLoggedIn, jellyRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});