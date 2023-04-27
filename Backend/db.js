const MongoClient = require('mongodb').MongoClient;
const ServerApiVersion = require('mongodb').ServerApiVersion;
const mongoose = require('mongoose');
const mongURI = "mongodb://127.0.0.1:27017/User";

const connectToMongo = () => {
    mongoose.connect(
        mongURI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    )
        .then(() => console.log('connected'))
        .catch(e => console.log(e));
}

module.exports = connectToMongo;
