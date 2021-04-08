const joi = require("joi");

function validteMovie(movie) {
    const schema = joi.object({
        title: joi.string().min(5).max(255).required(),
        numberInStock: joi.number().max(10000).required(),
        dailyRental: joi.number(),
        genre: joi.array().items(joi.string().max(255).min(3).required())

    })
    return schema.validate(movie);
}

module.exports = {
    validteMovie
}