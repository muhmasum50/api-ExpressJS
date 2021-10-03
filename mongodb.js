var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  if (err) throw err

  var db = client.db('mdb_gaming')

  db.collection('users').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
})