// console.log('Hello caca');

//Lanjutan ke video 9

const validator = require('validator');
const chalk = require('chalk');
// console.log(validator.isEmail('oktakirana@gmail.com'));
// console.log(validator.isMobilePhone('0812345678', 'id-ID'));
// console.log(validator.isNumeric('0812345678'));

console.log(chalk.red.bgWhite('Hello caca'));
const pesan = chalk`Hello {bgBlue canu} {bgWhite semoga} kamu sukses`;
console.log(pesan);
