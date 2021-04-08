const customerResolvers = require('./customer')
const movieResolvers = require('./movie')
const genreResolvers = require('./genre')
const rentalResolvers = require('./rentals')
const authResolvers = require("./auth");


module.exports = {
    //TODO: adding Resolvers
    Query: {
        //TEST: resolvers can't be empty
        Intial() {
            return "hello workd"
        }

        // ...customerResolvers.Query,
        // ...movieResolvers.Query,
        // ...genreResolvers.Query,
        // ...rentalResolvers.Query
    },
    Mutation: {
        Intial() {
            return "hellow world"
        },

        // ...customerResolvers.Mutation,
        // ...movieResolvers.Mutation,
        // ...genreResolvers.Mutation,
        // ...rentalResolvers.Mutation,
        ...authResolvers.Mutation
    }
}