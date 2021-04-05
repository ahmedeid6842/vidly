const { ObjectId } = require("mongodb")
const { validationResult } = require("express-validator")
const _db = require("../helper/db").getDB;
module.exports.getGenres = async (req, res) => {
    const genres = await _db()
        .db()
        .collection("genres")
        .find()
        .toArray()
    if (genres.length === 0) return res.send("no genres found");

    return res.send(genres);
}

module.exports.getGenre = async (req, res) => {
    const genre = await _db()
        .db()
        .collection("genres")
        .findOne({ _id: ObjectId(req.params.id) })
    if (!genre) return res.send("no genre with that id");

    return res.send(genre);
}

module.exports.addGenre = async (req, res) => {
    //validate genres
    const errors = validationResult(req);
    if (errors) return res.status(402).send(errors.array())

    const { insertedId } = await _db()
        .db()
        .collection("genres")
        .insertOne(req.body)

    res.send({
        _id: insertedId,
        msg: "added succesfully"
    });
}

module.exports.updateGenre = async (req, res) => {
    //validate
    const errors = validationResult(req);
    if (errors) return res.status(402).send(errors.array())
    
    try {
        //update genre with id
        const { value: genre } = await _db()
            .db()
            .collection("genres")
            .findOneAndUpdate(
                { _id: ObjectId(req.params.id) },
                { $set: req.body },
                { returnOriginal: false }
            )
        if (!genre) return res.send("no genre with that id")

        return res.send({
            genre,
            msg: "updated successfully"
        });

    } catch (err) { //try-catch for id parameter validation > 12 character 
        return res.status(402).send(err.message)
    }
}

module.exports.deleteGenre = async (req, res) => {
    try {

        const { value: genre } = await _db()
            .db()
            .collection("genres")
            .findOneAndDelete(
                { _id: ObjectId(req.params.id) },
                { returnOriginal: false }
            )
        if (!genre) return res.send("no genre with that id")

        return res.send({
            genre,
            msg: "deleted successfully"
        });
    } catch (err) {
        return res.status(402).send(err.message);
    }
}