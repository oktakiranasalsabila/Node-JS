const { MongoClient, ObjectID } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'wpu';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect((error, client) => {
    if (error) {
        return console.log('koneksi gagal!');
    }

    //pilih database
    const db = client.db(dbName);

    // console.log('koneksi berhasil!');

    //menambahkan 1 data ke collection mahasiswa
    // db.collection('mahasiswa').insertOne({
    //     nama: 'salsa',
    //     email: 'salsa@gmail.com'
    // },
    // (error,result)=>{
    //     if (error) {
    //         return console.log('gagal menambhakan data');
    //     }
    //     console.log(result);
    // }
    // );

    //Menambahkan lebih dari satu data
    // db.collection('mahasiswa').insertMany(
    //     [
    //         {
    //             nama:'caca',
    //             email:'caca@gmail.com'
    //         },
    //         {
    //             nama:'bila',
    //             email:'bila@gmail.com'
    //         }
    //     ],
    //     (error,result)=>{
    //             if (error) {
    //                 return console.log('gagal menambhakan data');
    //             }
    //             console.log(result);
    //         }
    // );

    // //menampilkan semua data yang ada di colection 'mahasiswa'
    // console.log(db.collection('mahasiswa').find().toArray((error, result) => {
    //     console.log(result);
    // })
    // );

    //menampilkan  data berdasarkan kriteria di colection 'mahasiswa'

    // console.log(db
    //     .collection('mahasiswa')
    //     .find({_id: ObjectID('65e6b41e4365a2509c2a8267') })
    //     .toArray((error, result) => {
    //         console.log(result);
    //     })
    // );

    //mengubah data berdasarkan id
//    const updatePromise= db.collection('mahasiswa').updateOne(
//         {
//             _id: ObjectID('65e6b41e4365a2509c2a8267')
//         },
//         {
//            $set:{
//             email:'caluuu@gmail.com',
//            },
//         },
//     );
//     updatePromise.then((result) => {
//         console.log(result);
//     }).catch((error) => {
//         console.log(error);
//     });

//mengubah data lebih dari satu berdasarkan kriteria
// db.collection('mahasiswa').updateMany(
//     {
//         nama:'bila',
//     },
//     {
//         $set:{
//             nama:'bila doang',
//         },
//     }
// );

// //Menghapus 1 data
// db.collection('mahasiswa').deleteOne(
//     {
//         _id: ObjectID('65e6b41e4365a2509c2a8267')
//     }
// ).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// });

//Menghapus lebih dari 1 data
db.collection('mahasiswa').deleteMany(
    {
       nama:'salsa'
    }
).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

});