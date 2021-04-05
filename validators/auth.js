const { body, matchedData } = require("express-validator");
const _db = require("../helper/db").getDB;

module.exports.signupValidator = [
    body("email")
        .isEmail().withMessage("must be a valid email")
        .normalizeEmail()
        //lower case:to lower case
        .escape()
        .trim()
        .custom(email => {
            return _db()
                .db()
                .collection("users")
                .findOne({ email })
                .then((user) => {
                    if (user) return Promise.reject("email is already exists")
                })
        })
    , body("password")
        .isLength({ max: 16 })
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).withMessage("8~16 characters, at least one letter and one number")
    , body("name")
        .isString().withMessage("name must be a string")
        .isLength({ min: 5, max: 255 })

]

module.exports.loginValidator = [
    body('email')
        .isEmail().withMessage("invalid email address")
        .normalizeEmail()
        .trim()
        .escape()
    , body('password')
        .isLength({ min: 8, max: 16 }).withMessage("8~16 length")
        .isString().withMessage("must be a string")
]


    // .isMobilePhone
    // .isMongoId
    // isEthereumAddress



