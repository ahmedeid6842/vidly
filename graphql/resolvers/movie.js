const { UserInputError } = require("apollo-server-errors");
const { ObjectId } = require("bson");
const { validteMovie } = require("../../validators/movies")

module.exports = {
    Query: {
        //adding movie's Query resolvers
        async getMovie(parent, { movieTitle }, { _db }) {
            const movie = await _db()
                .db()
                .collection("movies")
                .findOne({ title: movieTitle })

            if (!movie) throw new Error("no movie with that id");
            return movie
        },

        async getMovies(parent, args, { _db }) {
            const movie = await _db()
                .db()
                .collection("movies")
                .find()
                .toArray()
            console.log(movie)
            if (movie.length === 0) throw new Error("no movie yet");
            return movie
        }
    },
    Mutation: {
        //TODO: adding movie's Mutation resolvers
        async createMovie(parent, { data }, { _db }) {
            const { error } = validteMovie(data);
            if (error) throw new UserInputError("validation Error", {
                errors: error.message
            })

            const { insertedId, ops } = await _db()
                .db()
                .collection("movies")
                .insertOne(data);

            return {
                _id: insertedId,
                ...ops[0]
            }
        },

        async updateMovie(parent, { movieId, data }, { _db }) {
            // TODO: validate updatedMovie
            const { value: movie } = await _db()
                .db()
                .collection("movies")
                .findOneAndUpdate(
                    { _id: ObjectId(movieId) },
                    { $set: data },
                    { returnOriginal: false }
                )
            if (!movie) throw new Error("no movie with that id");

            return movie
        },
        async deleteMovie(parent, { movieId }, { _db }) {
            const { value: movie } = await _db()
                .db()
                .collection("movies")
                .findOneAndDelete(
                    { _id: ObjectId(movieId) },
                    { returnOriginal: false }
                )
            if (!movie) throw new Error("no movie with that id")

            return `movie with { id : ${movie._id} } deleted successfully`
        }
        //TODO: addReview
        //TODO: addRating
    }
}