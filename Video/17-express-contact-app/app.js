const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact } = require('./utils/contacts');
const app = express();
const port = 3000;


//gunakan ejs
app.set('view engine', 'ejs');

//third-party middleware
app.use(expressLayouts);


//buidt-in middleware
app.use(express.static('public'))


app.get('/', (req, res) => {
    const mhs = [
        {
            nama: 'salsabila',
            email: 'salsa@gmail.com',
        },
        {
            nama: 'salu',
            email: 'salu@gmail.com',
        },
    ];
    res.render('index', {
        nama: 'salu',
        title: 'halaman home',
        mhs,
        layout: 'layouts/main-layout',

    });
});
app.get('/about', (req, res) => {
    res.render('about', {

        layout: 'layouts/main-layout',
        title: 'Halaman About',
    });


});
app.get('/contact', (req, res) => {
    const contacts = loadContact();

    res.render('contact', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
        contacts,
    });

});
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('detail', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
        contact,
    });

});

app.get('/product/:id', (req, res) => {
    res.send(`Product ID :  ${req.params.id}<br> Category : ${req.query.category}`);
});

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});