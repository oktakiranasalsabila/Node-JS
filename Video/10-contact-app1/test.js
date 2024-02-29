const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


//membuat folder data 
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

//membuat file contact .json jika belum ada
const dataPath = './data/test.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');

}

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama);
        });
    });
};

const simpanTest = (nama, email, noHp, umur) => {
    const tests = { nama, email, noHp, umur };
    const file = fs.readFileSync('data/test.json', 'utf-8');
    const test = JSON.parse(file);
    test.push(tests);
    fs.writeFileSync('./data/test.json', JSON.stringify(test));
    console.log('Terimakasih sudah memasukan data anda');
    rl.close();
};

module.exports = { tulisPertanyaan, simpanTest };