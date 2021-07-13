const express = require("express");
const log = require("./middleware/log");
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.set('views', 'views');
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(log);

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.get('/broken', (req, res) => {
    throw new Error('Broken!');
});

app.use('*', (req, res) => {
    res.status(404).render('404', { url: req.originalUrl });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500');
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
