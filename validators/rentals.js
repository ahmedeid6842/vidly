const joi = require("joi")
joi.ObjectId = require("joi-objectid")(joi)

function validateRental(rental) {
    const schema = joi.object({
        customer: joi.ObjectId().required(),
        movie: joi.string().required(),
        dateOut: joi.date(),
    })

    return schema.validate(rental);
}

module.exports = {
    validateRental
}