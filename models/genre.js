const mongoose = require("mongoose");
const joi = require("joi");

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    }
})

function validateGenre(genre) {
    const schema = joi.object({
        name: joi.string().min(3).max(255).required()
    })

    return schema.validate(genre);
}

module.exports = {
    Genre: mongoose.model("genre", genreSchema),
    validateGenre
}