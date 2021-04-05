const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb")
const { validationResult } = require("express-validator")

const _db = require("../helper/db").getDB;
const { generateAccessToken, generateRefreshToken, sendRefreshToken } = require("../helper/tokens")

module.exports.register = async (req, res) => {
    //validation
    const error = validationResult(req)
    if (!error.isEmpty()) return res.status(402).send(error.array())

    try {
        //hash the password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)

        //create a user in mogodb
        const { insertedId } = await _db()
            .db()
            .collection('users')
            .insertOne(req.body)

        //generate token (access & refresh )
        const accesstoken = await generateAccessToken(insertedId);
        const refreshToken = await generateRefreshToken(insertedId);

        //save the refresh token with user to check it
        await _db()
            .db()
            .collection('users')
            .updateOne({ _id: ObjectId(insertedId) }, { $set: { refreshToken } })

        //send the refresh token in the cookie , access token in header "x-auth"
        sendRefreshToken(res, refreshToken)
        return res.header("x-auth", accesstoken).status(201).send({ msg: "registered successfully" });
    } catch (err) {
        return res.send(err);
        //validation use mongoSchema validation in email "unique" as refernce validation ,,, instead of perform a search on DB
    }

}

module.exports.login = async (req, res) => {
    //validate login RequestBody
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(402).send(error.array())
    
    const { email, password } = req.body;


    //check if email exsits
    const { password: hashedPassword, _id } = await _db() //destructure "password" and rename it to "hashedPassword"
        .db()
        .collection("users")
        .findOne({ email })
    if (!_id) return res.send("email not Found or password Wrong");

    //compare password
    let isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) return res.status(404).send("email not Found or password Wrong");

    //generate tokens
    const accesstoken = await generateAccessToken(_id);
    const refreshtoken = await generateRefreshToken(_id)

    sendRefreshToken(res, refreshtoken);
    return res.header("x-auth-token", accesstoken).status(200).send({ msg: "login successfully" })
}

module.exports.resetPassword = (req, res) => {
    //future changes .... it requires sending emails
}