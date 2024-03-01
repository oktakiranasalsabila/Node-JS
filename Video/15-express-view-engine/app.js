const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;


//gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.get('/', (req, res) => {
    const mhs = [];
    res.render('index', {
        nama: 'salu',
        title: 'halaman home',
        mhs,

    });
});
app.get('/about', (req, res) => {
    res.render('about');

});
app.get('/contact', (req, res) => {
    res.render('contact');

});

app.get('/product/:id', (req, res) => {
    res.send(`Product ID :  ${req.params.id}<br> Category : ${req.query.category}`);
});
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});