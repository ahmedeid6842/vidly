const gql = require("graphql-tag");

module.exports = gql`
    type Query{
        Intial:String!

        # TODO: get customer&genre&movie&rental
        # getCustomer
        # getCustomers

        # getGenre
        # getGenres

        # getMovie
        # getMovies

        # getRental
        # getRentals
    }

    type Mutation{
        Intial:String!

        # TODO: adding login&register 
        # login
        # register

        # TODO: add-update-delete customer
        # createCustomer
        # updateCustomer
        # deleteCustomer

        # TODO: add-update-delete genres
        # createGenre
        # updateGenre
        # deleteGenre

        # TODO: add-update-delete movies && Review or rating
        # createMovie
        # updateMovie
        # deleteMovie
        # addReview
        # addRating

        # TODO: add-update-delete rental && rentalBack
        # createRental
        # updateRental
        # deleteRental
        # rentalBack
    }


    #TODO:uncomment this block of code 
    # type Customer{
    #     # _id , name , email , isGold , phone
    # }

    # type Genre{
    #     # _id , name
    # }

    # type Movie{
    #     # _id , title , numberInStock , dailyRentalsRate , genre
    # }

    # type Rental{
    #     # _id , Customer , Movie {title,dailyRentalRate} , dateOut , dateReturned , rentalFee
    # }

    # input registerInput {
    
    # }

    # input loginInput {
    
    # }

    # input createCustomerInput {
        
    # }

    # input updateCustomerInput{

    # }

    # input createGenreInput{

    # }

    # input updateGenreInput{

    # }

    # input createMovieInput{

    # }

    # input updateMovieInput{

    # }

    # input createRentalInput{

    # }

    # input updateRentalInput{
        
    # }
`