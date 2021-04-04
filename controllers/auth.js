const bcrypt = require("bcrypt");

const { User, validateSignup, validateLogin, generateAuthToken } = require("../models/user");

module.exports.register = async (req, res) => {
    const { error } = validateSignup(req.body);
    if (error) return res.status(402).send(error.message);

    try {
        //hash the password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)

        //create a user in mogodb
        //generate a token

        return res.header("x-auth-token", token).status(201).send("register successfully");
    } catch (err) {
        //use mongoSchema validation in email "unique" as refernce validation ,,, instead of perform a search on DB
    }

}

module.exports.login = async (req, res) => {
    //validate login RequestBody
    const { error } = validateLogin(req.body);
    if (error) return res.status(402).send(error.message);

    //check if email exsits
    
    //compare password
    let isMatch = await bcrypt.compare();
    if (!isMatch) return res.status(404).send("email not Found or password Wrong");

    //generate a token

    return res.header("x-auth-token", token).status(200).send("login successfully")
}

module.exports.resetPassword = (req, res) => {
    //future changes .... it requires sending emails
}