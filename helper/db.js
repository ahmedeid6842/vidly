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
            callback(null, _db);
        }).catch(error => {
            callback(error);
        })
}
const getDB = () => {
    if (!_db) {
        throw Error("DataBase not intialized");
    }
    return _db;
}

module.exports = {
    initDB,
    getDB
}

