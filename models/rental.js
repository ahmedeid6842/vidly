const mongoose = require("mongoose");
const joi = require("joi");
joi.ObjectId = require("joi-objectid")(joi);

const rentalSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: "customers",
        required: true
    },
    movie: {
        title: {
            type: String,
            minlength: 3,
            maxlength: 255,
            required: true
        },
        dailyRentalRate: {
            type: Number,
            required: true
        }
    },
    dateOut: {
        type: Date,
        default: Date.now()
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        required: true
    }
})

rentalSchema.methods.rentalPrice = function () { // this function to calculate the price of rental when the movie is returned  
    this.dateReturned = new Date(); //  when this function "rentalPrice" called we assign a current Date to dataReturned attribute    

    const rentalDay = moment().diff(this.dateOut, 'days'); //calculate the nOf days when the movie is rentaled untill now"time it returned"
    this.rentalFee = rentalDay * this.movie.dailyRentalRate; //calculate the price

}

function validateRental(rental) {
    const schema = joi.object({
        customer: joi.ObjectId().required(),
        movie: {
            title: joi.string().min(3).max(255).required(),
            dailyRentalRate: joi.Number().required(),
        },
        dateOut: joi.date(),
        rentalFee: joi.number().required()
    })

    return schema.validate(rental);
}

module.exports = {
    Rental: mongoose.model("rental", rentalSchema),
    validateRental
}