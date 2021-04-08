const customerResolvers = require('./customer')
const movieResolvers = require('./movie')
const genreResolvers = require('./genre')
const rentalResolvers = require('./rentals')
const authResolvers = require("./auth");


module.exports = {
    //TODO: adding Resolvers
    Query: {
        
        ...customerResolvers.Query,
        // ...movieResolvers.Query,
        // ...genreResolvers.Query,
        // ...rentalResolvers.Query
    },
    Mutation: {

        ...customerResolvers.Mutation,
        // ...movieResolvers.Mutation,
        // ...genreResolvers.Mutation,
        // ...rentalResolvers.Mutation,
        ...authResolvers.Mutation
    }
}