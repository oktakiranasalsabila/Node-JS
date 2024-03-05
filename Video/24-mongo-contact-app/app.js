const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
require('./utils/db');
const Contact = require('./model/contact');
const app = express();
const port = 3000;

//setup ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);//third-party middleware
app.use(express.static('public'));//buidt-in middleware
app.use(express.urlencoded({ extended: true }));

//konfigurasi flash
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());


//halaman home
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
    console.log('ini halaman home');
});

//halaman about
app.get('/about', (req, res) => {
    res.render('about', {

        layout: 'layouts/main-layout',
        title: 'Halaman About',
    });
});

//halaman contact
app.get('/contact', async (req, res) => {
    const contacts = await Contact.find();
    res.render('contact', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
        contacts,
        msg: req.flash('msg'),
    });

});

//halaman detail contact
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });
    res.render('detail', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});

app.listen(port, () => {
    console.log(`mongo contact app | listening at http://localhost:${port}`);
})