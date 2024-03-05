const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
require('./utils/db');
const Contact = require('./model/contact');
const app = express();
const port = 3000;

//setup method override
app.use(methodOverride('_method'));

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

//halaman form tambah data
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Form Tambah Data Contact',
        layout: 'layouts/main-layout',

    });
});

// proses tambah data contact
app.post('/contact', [
    body('nama').custom(async (value) => {
        const duplikat = await Contact.findOne({ nama: value });
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
        res.render('add-contact', {
            title: 'Form tambah data Contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
        });
    } else {
        Contact.insertMany(req.body, (error, result) => {
            //kirimkan flash message
            req.flash('msg', 'Data berhasil ditambahkan');
            res.redirect('/contact');
        });
    }
});

// //proses delete contact
// app.get('/contact/delete/:nama', async (req, res) => {
//     const contact = await Contact.findOne({ nama: req.params.nama });
//     if (!contact) {
//         res.status(404);
//         res.send('<h1>404</h1>');
//     } else {
//         Contact.deleteOne({ _id:contact._id }).then((result) => { 
//             req.flash('msg', 'Data contact berhasil dihapus');
//             res.redirect('/contact');
//         });
//     }
// });
app.delete('/contact', (req, res) => {
    Contact.deleteOne({ nama: req.body.nama }).then((result) => {
        req.flash('msg', 'Data contact berhasil dihapus');
        res.redirect('/contact');
    });
});

//form edit data
app.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });

    res.render('edit-contact', {
        title: 'Form Edit Data Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});

//proses ubah data
app.put('/contact', [
    body('nama').custom(async (value, { req }) => {
        const duplikat = await Contact.findOne({ nama: value });
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

            res.render('edit-contact', {
                title: 'Form ubah data Contact',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                contact: req.body,
            });
        } else {

            Contact.updateOne({ _id: req.body._id },
                {
                    $set:{
                        nama:req.body.nama,
                        email:req.body.email,
                        nohp:req.body.nohp,
                    },
                }
            ).then((result) => {
                //kirimkan flash message
                req.flash('msg', 'Data Contact berhasil diubah');
                res.redirect('/contact');
            });
        }
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