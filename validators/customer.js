const joi = require("joi");
joi.ObjectId = require("joi-objectid")(joi)

function validateCustomer(customer) {

    const schema = joi.object({
        name: joi.string().min(5).max(255).required(),
        isGold: joi.boolean(),
        phone: joi.string().min(11).max(11)
    })
    return schema.validate(customer);
}

module.exports = {
    validateCustomer
}