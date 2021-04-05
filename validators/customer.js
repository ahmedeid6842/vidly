const { body } = require("express-validator");

module.exports.customerValidator = [
    body("name")
        .isString().withMessage("must be a string")
        .isAlpha().withMessage("must contain only characters")
        .isLength({ min: 5, max: 255 })
    , body("isGold")
        .isBoolean()
        .optional({ nullable: true }) // to make this field optional to insert or not 
    , body("phone")
        .isMobilePhone("ar-EG").withMessage("must be an egypt mobile number")
        .optional({ nullable: true })
]

module.exports.customerUpdateValidator = [
    body("name")
        .isString().withMessage("must be a string")
        .isAlpha().withMessage("contain only characters")
        .isLength({ min: 5, max: 255 })
        .optional({nullable:true})
    , body("isGold")
        .isBoolean()
        .optional({ nullable: true }) // to make this field optional to insert or not 
    , body("phone")
        .isMobilePhone("ar-EG").withMessage("must be a valid mobile phone")
        .optional({ nullable: true })
]