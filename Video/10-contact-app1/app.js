///core module
// file system
// const fs = require('fs');

//menuliskan string ke file (synchronous)

// try {

//     fs.writeFileSync('test.txt', 'hello world secara synchronous!');
// } catch (e) {
//     console.log(e);
// }

//menulis string ke file Asynchronous

// fs.writeFile('test.txt', 'hello world secara Asynchronous!', (e) => {
//     console.log(e);
// });

//membaca isi file (synchronous)

// const data = fs.readFileSync('test.txt');
// console.log(data.toString());

//membaca isi file dengan asynchronous
//mengunakan toString()
// fs.readFile('test.txt', (err, data) => {
//     if (err) throw err;
//     console.log(data.toString());
//   });
//tanpa toString
// fs.readFile('test.txt','utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });

// readline
const test=require('./test');
   const main = async()=>{
    const nama = await tulisPertanyaan('Masukan nama anda :');
    const email = await tulisPertanyaan('Masukan email anda :');
    const noHp = await tulisPertanyaan('Masukan noHp anda :');
    const umur = await tulisPertanyaan('Masukan umur anda :');

  simpanTest(nama,email,noHp,umur);
   };
   main();
// rl.question('masukan nama anda : ', (nama) => {
//     rl.question('masukan nohp anda :', (noHp) => {
//         rl.question('masukan usia anda : ', (umur) => {
//             rl.question('masukan email anda :',(email)=>{

//                 const tests = { nama, noHp, umur, email};
//                 const file = fs.readFileSync('./data/test.json', 'utf-8');
//                 const test = JSON.parse(file);
    
//                 test.push(tests);
    
//                 fs.writeFileSync('./data/test.json', JSON.stringify(test));
//                 console.log('Terimakasih sudah memasukan data anda');
//                 rl.close();
//             });
//         });
//     });
// });
