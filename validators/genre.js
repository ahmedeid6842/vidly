const joi = require("joi")

function validateGenre(genre) {
    const schema = joi.object({
        name: joi.string().min(3).max(255).required()
    })

    return schema.validate(genre);
}

module.exports = {
    validateGenre
}