const { body } = require("express-validator")

module.exports.movieValidator = [
    body("title")
        .isString().withMessage("title must be a string")
        .isLength({ min: 2, max: 255 }).withMessage("5~255 length")
    , body("numberInStock")
        .isNumeric().withMessage("numberInStock must be a number 0~10000 length")
    // .isLength({ min: 0, max: 10000 }).withMessage("0 ~ 10000 length")
    , body("dailyRentalRate")
        .isNumeric().withMessage("daily rental rate must be a number")
        .optional({ nullable: true })
    , body("genre.name")
        .isArray({ min: 1, max: 8 }).withMessage("genre.name must be an array")
        .optional({ nullable: true })
    , body("genre.name.*") // "*" to access the value of the array itself ,,,ex: arr1=[1,2,3] ,,*=1,2,3 
        .isString().withMessage("genres' type must be a string")
]

module.exports.movieUpdateValidator = [
    body("title")
        .isString().withMessage("title must be a string")
        .isLength({ min: 5, max: 255 }).withMessage("5~255 length")
        .optional({ nullable: true })
    , body("numberInStock")
        .isNumeric().withMessage("numberInStock must be a number")
        .isLength({ min: 0, max: 10000 }).withMessage("0 ~ 10000 length")
        .optional({ nullable: true })
    , body("dailyRentalRate")
        .isNumeric().withMessage("daily rental rate must be a number")
        .optional({ nullable: true })
    , body("genre.name")
        .isString().withMessage("name must be a string")
        .optional({ nullable: true })
]