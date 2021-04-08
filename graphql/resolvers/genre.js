const { UserInputError } = require("apollo-server-errors");
const { ObjectId } = require("bson");

const { validateGenre } = require("../../validators/genre")

module.exports = {
    Query: {
        //TODO: adding genre's Query resolvers
        async getGenre(parent, { genreId }, { _db }) {
            const genre = await _db()
                .db()
                .collection("genres")
                .findOne({ _id: ObjectId(genreId) })
            if (!genre) throw new UserInputError("no genre found", {
                error: "no genre with that id"
            })
            return genre;
        },
        async getGenres(parent, { genreId }, { _db }) {
            const genres = await _db()
                .db()
                .collection("genres")
                .find()
                .toArray()
            if (!genres) throw new Error("no genres yet");
            return genres
        }
    },
    Mutation: {
        //TODO: adding genre's Mutation resolvers
        async createGenre(parent, { data }, { _db }) {
            //validate created Genre
            const { error } = validateGenre(data)
            if (error) throw new UserInputError("validation error", {
                errors: error.message
            })

            //create genre
            let { insertedId, ops } = await _db()
                .db()
                .collection("genres")
                .insertOne(data)
            return {
                _id: insertedId,
                ...ops[0]
            }
        },
        async updateGenre(parent, { genreId, data }, { _db }) {
            // TODO:validate updated genre
            // TODO: check if there are gener with that id ,,, if yes update it ,,, if no throw error 
            const { value: genre } = await _db()
                .db()
                .collection("genres")
                .findOneAndUpdate(
                    { _id: ObjectId(genreId) },
                    { $set: data },
                    { returnOriginal: false }
                )
            if (!genre) throw new Error("no genre with that id");
            return genre
        },
        async deleteGenre(parent, { genreID }, { _db }) {

            const { value: genre } = await _db()
                .db()
                .collection("genres")
                .findOneAndDelete(
                    { _id: ObjectId(genreID) },
                    { returnOriginal: false }
                )
            if (!genre) throw new Error("no genre with that id");

            return genre;
        }
    }
}