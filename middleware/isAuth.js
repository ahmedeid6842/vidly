const jwt = require("jsonwebtoken");

module.exports.isAuth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access denied");
    try {
        const decoded = jwt.verify(token, "secret");
        req.user = decoded;
        return next()
    } catch (err) {
        return res.status(400).send("invalid token");
    }
}