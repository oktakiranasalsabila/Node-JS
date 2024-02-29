// console.log('Hello World');

///function
function cetakNama(nama) {
    return `hallo, nama saya ${nama}`;

}

///variable
const PI = 3.14;

//object
const mahasiswa = {
nama: 'salsabila',
umur: 22,
cetakMhs(){
    return` hallo, nama saya ${this.nama} dan saya ${this.umur} tahun.`
},
};
class Orang{
    constructor(){
        console.log('object orang telah di buat');
    }
}
module.exports = {cetakNama,PI,mahasiswa,Orang};