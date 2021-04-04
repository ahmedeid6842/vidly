const { ObjectId } = require("mongodb")

const _db = require("../helper/db").getDB
const { rentalPrice } = require("../helper/rentalPrice")

module.exports.getRentals = async (req, res) => {
    const rentals = await _db()
        .db()
        .collection("rentals")
        .aggregate([
            {
                $lookup: {
                    from: "movies",
                    let: { title: "$movie.title" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$title", "$$title"]
                                }
                            }
                        }
                    ],
                    as: "movie"
                }
            },
            {
                $lookup: {
                    from: "customers",
                    let: { customerId: "$customer" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", "$$customerId"]
                                }
                            }
                        }
                    ],
                    as: "customer"
                }
            }
        ])
        .toArray();
    if (rentals.length === 0) return res.send("no rentals found");

    return res.send(rentals);
}

module.exports.getRental = async (req, res) => {
    const rental = await _db()
        .db()
        .collection("rentals")
        .aggregate([
            { $match: { _id: ObjectId(req.params.id) } },
            {
                $lookup: {
                    from: "movies",
                    let: { title: "$movie.title" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$title", "$$title"]
                                }
                            }
                        }
                    ],
                    as: "movie"
                }
            },
            {
                $lookup: {
                    from: "customers",
                    let: { customerId: "$customer" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", "$$customerId"]
                                }
                            }
                        }
                    ],
                    as: "customer"
                }
            }
        ]).toArray();

    if (!rental) return res.send("no rental with that id")

    return res.send(rental)
}

module.exports.addRental = async (req, res) => {
    let { movie, customer, dailyRentalRate } = req.body;
    customer = ObjectId(customer);
    //validate Rentals

    //check if customer exists
    const _customer = await _db()
        .db()
        .collection("customers")
        .findOne({ _id: customer })
    if (!_customer) return res.send({ error: "no customer with that id" })

    //check if movie exists ... if it's increment the numberInStock+1
    const { value: _movie } = await _db()
        .db()
        .collection("movies")
        .findOneAndUpdate(
            { title: movie },
            {
                $inc: {
                    numberInStock: -1
                }
            },
            { returnOriginal: false }
        )
    if (!_movie) return res.send({ error: "no movie with that title" })

    //create rental
    const { insertedId: rental } = await _db()
        .db()
        .collection("rentals")
        .insertOne({
            customer,
            movie: { title: movie, dailyRentalRate },
            dateOut: new Date()
        })

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
        const { movieTitle } = req.body;
        //check if rental exists
        let rental = await _db()
            .db()
            .collection("rentals")
            .findOne({ _id: ObjectId(req.params.id) });
        console.log(rental)
        if (!rental) return res.send("no rental with that id")


        //call rental price function
        const rentalFee = rentalPrice(rental.dateOut, rental.movie.dailyRentalRate); //call rentalPrice function which calculate the rentalFee based on the number of days the movie is rentaled

        //find a movie by it's title and then increase the number in stack +1

        let { value: movie } = await _db()
            .db()
            .collection("movies")
            .findOneAndUpdate(
                { title: movieTitle },
                { $inc: { numberInStock: 1 } },
                { returnOriginal: false }
            )

        let { value: _rental } = await _db()
            .db()
            .collection("rentals")
            .findOneAndUpdate(
                { _id: ObjectId(req.params.id) },
                { $set: { rentalFee, dateReturned: new Date() } },
                { returnOriginal: false }
            )
        console.log(_rental);

        return res.send({
            rentalFee: rentalFee,
            dateOut: _rental.dateOut,
            dailyRentalRate: _rental.movie.dailyRentalRate
        })

    } catch (err) {
        return res.send(err.message)
    }

}