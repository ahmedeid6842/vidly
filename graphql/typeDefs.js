const gql = require("graphql-tag");

module.exports = gql`
    type Query{
        Intial:String!
        
        # get customer&genre&movie&rental
        getCustomer(customerId:ID!): Customer!
        getCustomers: [Customer!]

        getGenre(genreId:ID!): Genre!
        getGenres: [Genre!]

        getMovie(movieTitle:String!): Movie!
        getMovies:[Movie!]

        getRental(rentalId:ID):Rental!
        getRentals:[Rental!]
    }

    type Mutation{
        Intial:String!
        # adding login&register 
        login(data:loginInput): User!
        register(data:registerInput): User!

        # add-update-delete customer
        createCustomer(data:createCustomerInput!): Customer!
        updateCustomer(customerId:ID!,data:updateCustomerInput!): Customer!
        deleteCustomer(customerId:ID!): Customer!

        # add-update-delete genres
        createGenre(data:createGenreInput!): Genre!
        updateGenre(genreId:ID!,data:updateGenreInput!): Genre!
        deleteGenre(genreID:ID!): Genre!

        # add-update-delete movies && Review or rating
        createMovie(data:createMovieInput!):Movie!
        updateMovie(movieId:ID!,data:updateMovieInput!):Movie
        deleteMovie(movieId:ID!):String!
        addReview(movieId:ID!,reviewBody:String!):Movie!
        addRating(movieId:ID!,rating:Int!):Movie!

        # add-update-delete rental && rentalBack
        createRental(data:createRentalInput!): Rental!
        updateRental(rentalId:ID!,data:updateRentalInput): Rental!
        deleteRental(rentalId:ID!): String!
        rentalBack(rentalId:ID!):Rental
    }


    #uncomment this block of code 
    type User{
        _id:ID!
        name:String!
        email:String!
        token:String!
    }
    
    type Customer{
        # _id , name , email , isGold , phone
        _id:ID!
        name:String!
        email:String!
        isGold:Boolean!
        phone:String
    }

    type Genre{
        # _id , name
        _id:ID!
        name:String!
    }

    type Movie{
        # _id , title , numberInStock , dailyRentalsRate , genre
        _id: ID!
        title: String!
        numberInStock: Int!
        dailyRentalRate: Int
        genre: [Genre!]
    }

    type Rental{
        # _id , Customer , Movie {title,dailyRentalRate} , dateOut , dateReturned , rentalFee
        _id: ID!
        Customer: Customer!
        Movie: rentalMovie!
        dateOut: String!
        dateReturned: String
        rentalFee: Int
    }

    type rentalMovie{
        title: String!
        dailyRentalRate: Int!
    }

    input registerInput {
        name:String!
        email:String!
        password:String!
    }

    input loginInput {
        email:String!
        password:String!
    }

    input createCustomerInput {
        name:String!
        isGold:Boolean!
        phone:String!   
    }

    input updateCustomerInput{
        name:String
        isGold:Boolean
        phone:String
    }

    input createGenreInput{
        name:String!
    }

    input updateGenreInput{
        name:String
    }

    input createMovieInput{
        title:String!
        numberInStock:Int
        dailyRental:Int
        genre:createCustomerInput
    }

    input updateMovieInput{
        title:String
        numberInStock:Int
        dailyRental:Int
    }

    input createRentalInput{
        Customer:ID!
        Movie:ID!
        dateOut:String
    }

    input updateRentalInput{
        dateOut:String!
    }
`