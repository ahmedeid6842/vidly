const jwt = require("jsonwebtoken");

require("dotenv/config")

const generateAccessToken = (_id, isAdmin) => {
    return new Promise((resolve) => {
        const token = jwt.sign(
            { _id, isAdmin },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        )
        resolve(token);
    })

}

const generateRefreshToken = (_id) => {
    return new Promise((resolve) => {
        const token = jwt.sign(
            { _id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        )
        resolve(token);
    })
}


const sendRefreshToken = (res, refreshToken) => {
    res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/refresh_token"
    })
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    sendRefreshToken
}