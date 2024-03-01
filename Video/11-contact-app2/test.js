const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
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

const loadTest = () => {
    const file = fs.readFileSync('data/test.json', 'utf-8');
    const test = JSON.parse(file);
    return test;
}


const simpanTest = (nama, email, noHp, umur) => {
    const tests = { nama, email, noHp, umur };
    // const file = fs.readFileSync('data/test.json', 'utf-8');
    // const test = JSON.parse(file);
    const test = loadTest();
    //cek duplikat
    const duplikat = test.find((test) => test.nama === nama);
    if (duplikat) {
        console.log(chalk.red.inverse('kontak sudah terdaftar gunakan nama lain'));
        return false;
    }

    //cek email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse('Email tidak valid'));
            return false;

        }
    }

    ///cek nomor hp
    if (!validator.isMobilePhone(noHp, 'id-ID')) {
        console.log(chalk.red.inverse('No hp tidak valid'));
        return false;

    }

    test.push(tests);
    fs.writeFileSync('./data/test.json', JSON.stringify(test));
    console.log(chalk.green.inverse('Terimakasih sudah memasukan data anda'));

};

const listTest = () => {
    const test = loadTest();
    console.log(chalk.cyan.inverse('Daftar kontak : '));
    test.forEach((test, i) => {
        console.log(`${i + 1}. ${test.nama}-${test.noHp}`);
    });
};

const detailTest = (nama) => {
    const test = loadTest();
    const tests = test.find((tests) => tests.nama.toLowerCase() === nama.toLowerCase());
    if (!tests) {
        console.log(chalk.red.inverse(`${nama} tidak ditemukan!`));
        return false;
    }

    console.log(chalk.cyan.inverse(tests.nama));
    console.log(chalk.blue.inverse(tests.noHp));
    if (tests.email) {
        console.log(tests.email);
    }
    if (tests.umur) {
        console.log(tests.umur);
    }
    // console.log(tests.email);
    // console.log(chalk.grey.inverse(tests.umur));
};

const deleteTest = (nama) => {
    const test = loadTest();
    const newTest = test.filter((tests) => tests.nama.toLowerCase() !== nama.toLowerCase());
    if (test.length === newTest.length) {
        console.log(chalk.red.inverse(`${nama} tidak ditemukan!`));
        return false;
    }
    fs.writeFileSync('./data/test.json', JSON.stringify(newTest));
    console.log(chalk.green.inverse(`data kontak ${nama} berhasil di hapus`));
};

module.exports = { simpanTest, listTest, detailTest, deleteTest };