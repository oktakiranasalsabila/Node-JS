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
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


rl.question('masukan nama anda : ', (nama) => {
    rl.question('masukan nohp anda :', (noHp) => {
        rl.question('masukan usia anda : ', (umur) => {
            const tests = { nama, noHp, umur };
            const file = fs.readFileSync('test.json', 'utf-8');
            const test = JSON.parse(file);

            test.push(tests);
          
            fs.writeFileSync('test.json', JSON.stringify(test));
            console.log('Terimakasih sudah memasukan data anda');
            rl.close();
        });
    });
});
