const { validateRental } = require("../../validators/rentals");
const { rentalPrice } = require("../../helper/rentalPrice")

const { ObjectId } = require("mongodb")
module.exports = {
    Query: {
        //TODO: adding rental's Query resolvers
        async getRentals(parent, { rentalId }, { _db }) {
            const rentals = await _db()
                .db()
                .collection("rentals")
                .find()
                .toArray();
            if (rentals.length === 0) throw new Error("no rentals yet");
            return rentals;
        },
        async getRental(parent, { rentalId }, { _db }) {
            const rental = await _db()
                .db()
                .collection("rentals")
                .findOne({ _id: ObjectId(rentalId) });

            if (!rental) throw new Error("no rental with that id")
            return rental
        }
    },
    Mutation: {
        //TODO: adding rental's Mutation resolvers
        async createRental(parent, { data }, { _db }) {
            let { movie, customer, dailyRentalRate } = data;
            customer = ObjectId(customer);

            //validate Rentals
            const { error } = validateRental(data);
            if (error) throw new Error("validation Error")

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
            if (!_movie) throw new Error("no movie with that title")

            //create rental
            const { insertedId, ops } = await _db()
                .db()
                .collection("rentals")
                .insertOne({
                    customer,
                    movie: { title: movie, dailyRentalRate },
                    dateOut: new Date()
                })
                
            return {
                _id: insertedId,
                ...ops[0]
            }

        },

        // TODO:updateRental


        async deleteRental(parent, { rentalId }, { _db }) {
            let rental = await _db()
                .db()
                .collection("rentals")
                .findOneAndDelete(
                    { _id: ObjectId(rentalId) },
                    { returnOriginal: false }
                );
            if (!rental) throw new Error("no rental with that id");

            await _db()
                .db()
                .collection("rentals")
                .findOneAndUpdate({ title: rental.title },
                    {
                        $inc: {
                            numberInStock: 1
                        }
                    },
                )
            return `rental {id:${rentalId}} deleted `
        },

        async rentalBack(parent, { rentalId, movieTitle }, { _db }) {

            //check if rental exists
            let rental = await _db()
                .db()
                .collection("rentals")
                .findOne({ _id: ObjectId(rentalId) });
            if (!rental) throw new Error("no rental with that id")


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
                    { _id: ObjectId(rentalId) },
                    { $set: { rentalFee, dateReturned: new Date() } },
                    { returnOriginal: false }
                )

            return rental;
        }
    }
}