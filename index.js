require('dotenv').config()
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const port = process.env.PORT || 3000;

const indexRoutes = require('./routes/indexRouter');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');

app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static('public'));

app.use('/', indexRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});