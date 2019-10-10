const mongoose = require('mongoose');
const database = 'mongodb://localhost:27017/onebin'; // MONGODB

mongoose.Promise = global.Promise;
mongoose.connect(database, { useMongoClient: true });

const db = mongoose.connection;

db.on('error', (err) => {
    console.error(err);
});

db.once('open', () => {
    console.log("Mongo DB connected at %s ",database);
});


module.exports = db;
