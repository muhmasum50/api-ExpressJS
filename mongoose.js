const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mdb_gaming', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', async () => {
    /** connected */
    console.log('mongoose orm connected')
})