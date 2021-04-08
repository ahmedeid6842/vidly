const { UserInputError } = require("apollo-server-errors");
const { ObjectId } = require("bson");

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
        //createGenre
        //updateGenre
        //deleteGenre
    }
}