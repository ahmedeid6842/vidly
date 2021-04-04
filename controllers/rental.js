const mongoose = require("mongoose");

const { Rental, validateRental } = require("../models/rental");
const { Customer } = require("../models/customer")
const { Movie } = require("../models/movie");

module.exports.getRentals = async (req, res) => {
    if (rentals.length === 0) return res.send("no rentals found");
    return res.send(rentals);
}

module.exports.getRental = async (req, res) => {
    if (!rental) return res.send("no rental with that id")
    return res.send(rental)
}

module.exports.addRental = async (req, res) => {
    const { movie, customer } = req.body;
    const { error } = validateRental(req.body);
    if (error) return res.status(402).send(error.message)

    //check if customer exists

    //check if movie exists ... if it's increment the numberInStock+1


    //create rental
    return res.send({
        rental,
        msg: "added successfully",
        _movie
    });
}

module.exports.updateRental = async (req, res) => {
    try {
        //update rental

        return res.send({
            rental,
            msg: "update successfully"
        })

    } catch (err) {
        return res.status(402).send(err.message);
    }
}

module.exports.deleteRental = async (req, res) => {
    try {
        //delete a rental

        return res.send({
            rental,
            msg: "deleted successfully"
        })
    } catch (err) {
        return res.status(402).send(err.message)
    }
}

module.exports.rentalBack = async (req, res) => {
    try {
        const { rentalId, movieTitle } = req.body;
        //check if rental exists


        //call rental price function
        rental.rentalPrice(); //call rentalPrice function which calculate the rentalFee based on the number of days the movie is rentaled

        //find a movie by it's title and then increase the number in stack +1
            


        return res.send({
            rentalFee: rental.rentalFee,
            dateOut: rental.dateOut,
            dailyRentalRate: movie.dailyRentalRate
        })

    } catch (err) {
        return res.send(err.message)
    }

}