// const { ObjectID } = require('bson');
const express = require('express')
const router = express.Router()
// const connection = require('./connection')

require('./mongoose');
const User = require('./User')


router.get('/', (req, res) => {
    res.send('Hello Worlds!');
})

router.get('/user', async(req, res) => {
    try {
        const users = await User.find()
        res.send({data: users})
    } catch (error) {
        res.send({message: error.message || 'internal server error'})
    }
})

router.get('/user/:id', async(req, res) => {
    try {
        const {id} = req.params
        const user = await User.findOne({_id: id})
        if(user) {
            res.send({data: user})
        }
        else {
            res.send({message: 'user tidak ditemukan'})
        }
    } catch (error) {
        res.send({message: error.message || 'internal server error'})
    }
})

router.post('/user', async(req, res) => {
    try {
        const {name, age, status} = req.body
        const user = await User.create({
            name,
            age,
            status
        })
        res.send({data: user})

    } catch (error) {
        res.send({message: error.message || 'internal server error'})
    }
})

router.delete('/user/:id', async(req, res) => {
    try {
        const {id} = req.params
      
        const user = await User.deleteOne({
           _id: id
        })
        res.send({data: user})

    } catch (error) {
        res.send({message: error.message || 'internal server error'})
    }
})


router.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        const {name, age, status} = req.body
        const user = await User.updateOne({_id: id}, {
            name, 
            age,
            status
        }, { runValidators: true })

        if(user){
            res.send({data: user})
        }
        else {
            res.send({message: "user tidak ditemukan"})
        }

    } catch (error) {
        res.send({message: error.message || 'internal server error'})
    }
})

// router.get('/users', async(req, res) => {
//     try {
//         if(connection.connect()){
//             const db = connection.db('mdb_gaming')
//             const users = await db.collection('users').find().toArray()

//             res.send({data: users})
//         } else {
//             res.send({'message': 'koneksi gagal'})
//         }
//     } catch (error) {
//         res.send(error.message || 'internal server error')
//     }
// })

// router.post('/users', async(req, res) => {
//     try {
//         if(connection.connect()){
//             const{name, age, status} = req.body
//             const db = connection.db('mdb_gaming')
//             const users = await db.collection('users').insertOne({
//                 name,
//                 age,
//                 status
//             })
//             res.send({message: "berhasil menambahkan user"})
//         } else {
//             res.send({'message': 'koneksi gagal'})
//         }
//     } catch (error) {
//         res.send(error.message || 'internal server error')
//     }
// })

// router.put('/users/:id', async(req, res) => {
//     try {
//         if(connection.connect()){
//             const {id} = req.params
//             const{name, age, status} = req.body
//             const db = connection.db('mdb_gaming')
//             const users = await db.collection('users').updateOne({_id: ObjectID(id)}, {
//                 $set: {
//                     name,
//                     age,
//                     status
//                 }
//             })
//             res.send({message: "berhasil mengubah data user"})
//         } else {
//             res.send({'message': 'koneksi gagal'})
//         }
//     } catch (error) {
//         res.send(error.message || 'internal server error')
//     }
// })

// router.delete('/users/:id', async(req, res) => {
//     try {
//         if(connection.connect()){
//             const {id} = req.params
//             const db = connection.db('mdb_gaming')
//             const users = await db.collection('users').deleteOne({_id: ObjectID(id)})
            
//             if(users.deletedCount === 1) {
//                 res.send({message: "berhasil menghapus data user"})
//             }
//             else {
//                 res.send({message: "gagal menghapus data user"})
//             }
//         } else {
//             res.send({'message': 'koneksi gagal'})
//         }
//     } catch (error) {
//         res.send(error.message || 'internal server error')
//     }
// })


module.exports = router