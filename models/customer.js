const mongoose = require("mongoose");
const joi = require("joi");

const customerSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false,
        required: true
    },
    phone: {
        type: Number,
        min: 13, //specify exact length of phone number 11 Digit
        max: 9

    }
})

function validateCustomer(customer) {
    const schema = joi.object({
        name: joi.string().min(5).max(255).required(),
        isGold: joi.boolean(),
        phone: joi.number().min(13).max(9)
    })
    return schema.validate(customer);
}

module.exports = {
    Customer: mongoose.models("customer", customerSchema),
    validateCustomer
}