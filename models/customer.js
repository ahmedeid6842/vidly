const mongoose = require("mongoose");
const joi = require("joi");
joi.ObjectId = require("joi-objectid")(joi);

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
        type: String,
        min: 11, //specify exact length of phone number 11 Digit
        max: 11

    }
})

function validateCustomer(customer) {

    const schema = joi.object({
        _id: joi.ObjectId().required(),
        name: joi.string().min(5).max(255).required(),
        isGold: joi.boolean(),
        phone: joi.string().min(11).max(11)
    })
    return schema.validate(customer);
}

module.exports = {
    Customer: mongoose.model("customer", customerSchema),
    validateCustomer
}