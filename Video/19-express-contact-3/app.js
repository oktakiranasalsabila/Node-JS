const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContact } = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express();
const port = 3000;


//gunakan ejs
app.set('view engine', 'ejs');

//third-party middleware
app.use(expressLayouts);


//buidt-in middleware
app.use(express.static('public'));
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
        msg: req.flash('msg'),
    });

});

//halaman form tambah data
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Form Tambah Data Contact',
        layout: 'layouts/main-layout',

    });
});

// proses data contact
app.post('/contact', [
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value);
        if (duplikat) {
            throw new Error('Nama sudah digunakan');
        }
        return true
    }),
    check('email', 'Email Tidak Valid!').isEmail(),
    check('nohp', 'Nohp Tidak Valid!').isMobilePhone('id-ID'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        res.render('add-contact', {
            title: 'Form tambah data Contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
        });
    } else {

        addContact(req.body);
        //kirimkan flash message
        req.flash('msg', 'Data berhasil ditambahkan');
        res.redirect('/contact');
    }
});

//proses delete contact
app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    if (!contact) {
        res.status(404);
        res.send('<h1>404</h1>');
    } else {
        deleteContact(req.params.nama);
        req.flash('msg', 'Data contact berhasil dihapus');
        res.redirect('/contact');
    }
});

//form edit data
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('edit-contact', {
        title: 'Form Edit Data Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});

//proses ubah data
app.post('/contact/update', [
    body('nama').custom((value, { req }) => {
        const duplikat = cekDuplikat(value);
        if (value !== req.body.oldNama && duplikat) {
            throw new Error('Nama sudah digunakan');
        }
        return true;
    }),
    check('email', 'Email Tidak Valid!').isEmail(),
    check('nohp', 'Nohp Tidak Valid!').isMobilePhone('id-ID'),
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            res.render('edit-contact', {
                title: 'Form ubah data Contact',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                contact: req.body,
            });
        } else {

            updateContact(req.body);
            //kirimkan flash message
            req.flash('msg', 'Data Contact berhasil diubah');
            res.redirect('/contact');
        }
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