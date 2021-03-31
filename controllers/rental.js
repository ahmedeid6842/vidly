const mongoose = require("mongoose");

const { Rental, validateRental } = require("../models/rental");
const { Customer } = require("../models/customer")
const { Movie } = require("../models/movie");

module.exports.getRentals = async (req, res) => {
    const rentals = await Rental.find();
    if (rentals.length === 0) return res.send("no rentals found");
    return res.send(rentals);
}

module.exports.getRental = async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.send("no rental with that id")
    return res.send(rental)
}

module.exports.addRental = async (req, res) => {
    const { movie, customer } = req.body;
    const { error } = validateRental(req.body);
    if (error) return res.status(402).send(error.message)

    let _customer = await Customer.findById(customer);
    if (!_customer) return res.send("no customer with that id");

    let _movie = await Movie.findOneAndUpdate({ title: movie.title }, { // when a movi is rentaled , it's number in stock is decreased
        $inc: {
            numberInStock: -1
        }
    }, { new: true });

    if (!_movie) return res.send("no movie with that title")

    let rental = await Rental.create(req.body);

    return res.send({
        rental,
        msg: "added successfully",
        _movie
    });
}

module.exports.updateRental = async (req, res) => {
    try {

        let rental = await Rental.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!rental) return res.send("no rental with that id");
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
        let rental = await Rental.findByIdAndDelete(req.params.id);
        if (!rental) return res.send("no rental with that id");

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

        let rental = await Rental.findById(req.params.id );
        if (!rental) return res.send("no rental with that id");

        rental.rentalPrice(); //call rentalPrice function which calculate the rentalFee based on the number of days the movie is rentaled

        let movie = await Movie.findOneAndUpdate({ title: movieTitle }, { //increament the number of movie in stock
            $inc: {
                numberInStock: 1
            }
        })
        if (!movie) return res.send("no movie with that title")

        await rental.save()

        return res.send({
            rentalFee: rental.rentalFee,
            dateOut: rental.dateOut,
            dailyRentalRate: movie.dailyRentalRate
        })
    } catch (err) {
        return res.send(err.message)
    }

}