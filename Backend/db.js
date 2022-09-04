const MongoClient = require('mongodb').MongoClient;
const ServerApiVersion = require('mongodb').ServerApiVersion;
const mongoose = require('mongoose');
const mongURI = "mongodb://127.0.0.1:27017/User";
//const mongURI = "mongodb+srv://Yash:bItHPkcS8zU9OhJf@realmcluster.s2jue.mongodb.net/?retryWrites=true&w=majority";
const MONGOclient = new MongoClient(mongURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

/*
const connectToMongo = () => {
    mongoose.connect(MONGOclient, () => {
        console.log("Connected to MongoDB  Successfully");
    })
}
*/
const connectToMongo = () => {
    /*MONGOclient.connect()
         .then(() => console.log("Connected to MongoDB  Successfully"))
         .catch(err => {
             console.error('App starting error:', err.stack);
             process.exit(1)
         });*/
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