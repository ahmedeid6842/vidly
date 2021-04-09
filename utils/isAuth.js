const { AuthenticationError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken")
require("dotenv/config")

module.exports = (req) => {
    //get the authorziation header {"authroziation":"Bearer 4755daf.1256asdf1.4daf5afd4asf(token)"}
    const authHeader = req.headers.authorization;
    if (authHeader) {
        //get token itself by spliting Bearer 
        const token = authHeader.split(" ")[1]
        if (token) {
            try {
                // verify the token
                let user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                return user;
            } catch (err) {
                // if the token no verfied throw error
                throw new AuthenticationError("invalid token provided")
            }
        }
        // if no token provided throw error
        throw new Error("Authenctication token must be provided")
    }
    // if no headers provided throw error also
    throw new AuthenticationError("Authentication header must be provide")
}

