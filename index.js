const { ApolloServer } = require("apollo-server");
const gql = require('graphql-tag')

const db = require("./helper/db")
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");

require("dotenv/config");


const server = new ApolloServer({
    typeDefs,
    resolvers
})


const PORT = process.env.PORT || 3000
db.initDB((err, db) => {
    if (err) throw new Error(err)
    server.listen({ port: PORT }, console.log(`listening on port ${PORT}`))
})