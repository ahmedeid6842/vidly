const joi = require("joi");
const passwordComplexity = require("joi-password-complexity")

const complexityOptions = { //change the default option of joi-password-complexity
    min: 5,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4 // number of complexity that are requirement 
    // "aPassword123!" a valid password for those options
}

function validateSignup(user) {

    const schema = joi.object({
        name: joi.string().min(5).max(255).required(),
        email: joi.string().min(5).max(100).required(),
        password: passwordComplexity(complexityOptions).required() // apply joi-password-complexity on password attribute
    })

    return schema.validate(user)
}

function validateLogin(user) {
    const schema = joi.object({
        email: joi.string().min(5).max(100).required(),
        password: passwordComplexity(complexityOptions).required() // apply joi-password-complexity on password attribute
    })
    return schema.validate(user);
}

module.exports = {
    validateSignup,
    validateLogin
}




