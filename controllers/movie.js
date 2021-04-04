const { ObjectId } = require("mongodb")

const _db = require("../helper/db").getDB;

module.exports.getMovies = async (req, res) => {
    const movies = await _db()
        .db()
        .collection("movies")
        .find()
        .toArray()
    if (movies.length === 0) return res.send({ msg: "no movies found" })
    return res.send(movies)
}

module.exports.getMovie = async (req, res) => {
    const movie = await _db()
        .db()
        .collection("movies")
        .findOne({ _id: ObjectId(req.params.id) })

    if (!movie) return res.send({ msg: "no movie with that id" });

    return res.send(movie);
}

module.exports.addMovie = async (req, res) => {
    //validation on req.body

    const { insertedId } = await _db()
        .db()
        .collection("movies")
        .insertOne(req.body);

    return res.status(201).send({
        _id: insertedId,
        msg: "added successfully"
    })

}

module.exports.updateMovie = async (req, res) => {

    const { value: movie } = await _db()
        .db()
        .collection("movies")
        .findOneAndUpdate(
            { _id: ObjectId(req.params.id) },
            { $set: req.body },
            { returnOriginal: false }
        )
    if (!movie) return res.send({ msg: "no movie with that id" });

    return res.send({
        movie,
        msg: "update Successfully"
    })
}

module.exports.deleteMovie = async (req, res) => {

    const { value: movie } = await _db()
        .db()
        .collection("movies")
        .findOneAndDelete(
            { _id: ObjectId(req.params.id) },
            { returnOriginal: false }
        )
    if (!movie) return res.send({ error: "no movie with that id" })

    return res.send({
        movie,
        msg: "deleted successfully"
    })
}