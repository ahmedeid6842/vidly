const customerResolvers = require('./customer')
const movieResolvers = require('./movie')
const genreResolvers = require('./genre')
const rentalResolvers = require('./rentals')
const authResolvers = require("./auth");
const { ObjectId } = require('bson');


module.exports = {
    Rental: {
        customer: async ({ customer }, args, { _db }) => {
            return await _db()
                .db()
                .collection("customers")
                .findOne({ _id: ObjectId(customer) })
        },
    },
    //TODO: adding Resolvers
    Query: {

        ...customerResolvers.Query,
        ...movieResolvers.Query,
        ...genreResolvers.Query,
        ...rentalResolvers.Query
    },
    Mutation: {

        ...customerResolvers.Mutation,
        ...movieResolvers.Mutation,
        ...genreResolvers.Mutation,
        ...rentalResolvers.Mutation,
        ...authResolvers.Mutation
    }
}