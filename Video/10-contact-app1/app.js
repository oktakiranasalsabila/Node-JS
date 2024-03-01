const test=require('./test');
   const main = async()=>{
    const nama = await test.tulisPertanyaan('Masukan nama anda :');
    const email = await test.tulisPertanyaan('Masukan email anda :');
    const noHp = await test.tulisPertanyaan('Masukan noHp anda :');
    const umur = await test.tulisPertanyaan('Masukan umur anda :');

    test.simpanTest(nama,email,noHp,umur);
   };
   main();

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