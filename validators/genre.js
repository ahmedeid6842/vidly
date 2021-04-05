const { body } = require("express-validator")

module.exports.genreValidator = [
    body("name")
        .isString().withMessage("must be a string")
        .isAlpha().withMessage("contain only characters")
        .isLength({ min: 5, max: 255 })
]

