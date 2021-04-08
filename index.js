const { ApolloServer } = require("apollo-server");
const gql = require('graphql-tag')

const db = require("./helper/db")
const _db = require("./helper/db").getDB
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");

require("dotenv/config");


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        req,
        _db
    })
})


const PORT = process.env.PORT || 3000
db.initDB((err, db) => {
    if (err) throw new Error(err)
    server.listen({ port: PORT }, console.log(`listening on port ${PORT}`))
})