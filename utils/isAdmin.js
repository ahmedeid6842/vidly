const { AuthenticationError } = require("apollo-server-errors")
const isAuth = require("./isAuth")

module.exports = (user) => {
    if (!user.isAdmin) throw new AuthenticationError("your aren't authorized")
}