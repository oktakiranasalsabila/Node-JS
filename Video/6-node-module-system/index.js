// const nama = 'caca';
// const cetakNama = (nama) => `hi, nama saya ${nama}`;
// console.log(cetakNama(nama));

// const fs = require('fs'); // core module
// const cetakNama = require("./coba3");// local module
// const moment = require('moment');//third party module/npm module/node_modules
const coba3 = require("./coba3");

console.log(coba3.cetakNama('caca'),coba3.Pi, coba3.mahasiswa.cetakMhs(), new coba3.Orang());

