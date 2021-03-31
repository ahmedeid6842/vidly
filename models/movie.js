const mongoose = require("mongoose");
const joi = require("joi");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    numberInStock: {
        type: Number,
        maxlength: 10000,
        required: true
    },
    dailyRentalsRate: {
        type: Number,
    },
    genre: new mongoose.Schema({
        name: {
            type: String,
            minlength: 3,
            maxlength: 255
        }
    })
})

function validteMovie(movie) {
    const schema = joi.object({
        title: joi.string().min(5).max(255).required(),
        numberInStock: joi.number().max(10000).required,
        dailyRentalsRate: joi.number(),
        genre: { //go validation on embded docuement
            name: joi.string().min(3).max(255)
        }
    })

    return schema.validate(movie);
}

module.exports = {
    Movie: mongoose.model("movie", movieSchema),
    validteMovie

}