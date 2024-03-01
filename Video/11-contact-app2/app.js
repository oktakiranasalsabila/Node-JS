//mengambil argumen dari comand line
// console.log(process.argv);

// const { argv } = require("process");
const yargs = require("yargs");
const test = require("./test");

yargs.command({
   command: 'add',
   describe: 'Menambahkan Contact Baru',
   builder: {
      nama: {
         describe: 'nama lengkap',
         demandOption: true,
         type: 'string',
      },
      email: {
         describe: 'email',
         demandOption: false,
         type: 'string',
      },
      noHp: {
         describe: 'noHp',
         demandOption: true,
         type: 'string',
      },
      umur: {
         describe: 'umur',
         demandOption: false,
         type: 'number',
      },
   },
   handler(argv) {
     test.simpanTest(argv.nama, argv.email, argv.noHp, argv.umur);
   },
}).demandCommand();// menambahkan warning

//menampilkan daftar semua nama& noHp contact
yargs.command({
   command: 'list',
   describe:'menampilkan semua nama dan no hp',
   handler(){
      test.listTest();
   },
});

//menampilkan detail sebuah kontak
yargs.command({
   command: 'detail',
   describe:'menampilkan detail sebuah kontak berdasarkan nama',
   builder:{
      nama: {
         describe: 'nama lengkap',
         demandOption: true,
         type: 'string',
      },
   },
   handler(argv){
      test.detailTest(argv.nama);
   },
});


//menghapus kontak berdasarkan nama

yargs.command({
   command: 'delete',
   describe:'menghapus sebuah kontak berdasarkan nama',
   builder:{
      nama: {
         describe: 'nama lengkap',
         demandOption: true,
         type: 'string',
      },
   },
   handler(argv){
      test.deleteTest(argv.nama);
   },
});

yargs.parse();
// console.log(yargs.argv);
