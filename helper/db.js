const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const mongodbURL = "mongodb://localhost/vidly"

let _db;

const initDB = callback => {
    if (_db) {
        console.log("data base is already intialize");

        return callback(null, _db);
    }
    mongoClient
        .connect(mongodbURL)
        .then(client => { 
            _db = client;
            callback(null, _db)
        }).catch(err => {
            callback(err)
        })
}

const getDB = () => {
    if (!_db) {
        throw Error("DataBase not intialized");
    }
    return _db;
}

const initConfiguration = async () => { //create an index for user collection in email attribute
    if (!_db) {
        throw Error("DataBast not initalized")
    }
    await getDB()
        .db()
        .collection("users")
        .createIndex({ email: 1 })
}
module.exports = {
    initDB,
    getDB,
    initConfiguration
}

