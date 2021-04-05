const { body } = require("express-validator")

module.exports.rentalValidator = [
    body("customer")
        .isMongoId().withMessage("must be a valid id")
    , body("movie.title")
        .isString().withMessage("must be a string")
        .isLength({ min: 3, max: 255 })
    , body("movie.dailyRentalRate")
        .isNumeric().withMessage("must be a vlid rental rate")
    , body("dateOut")
        .isDate().withMessage("must be  a valid date")
        .optional({ nullable: true })
]