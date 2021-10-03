var MongoClient = require('mongodb').MongoClient
const connection = 'mongodb://localhost:27017/mdb_gaming'

const db = new MongoClient(connection, {
    useUnifiedTopology : true
});

(async() => {
    try {
        await db.connect()
    } catch (error) {
        console.log(error)
    }
})();

module.exports = db