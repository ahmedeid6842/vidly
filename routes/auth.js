const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/auth");
const { signupValidator, loginValidator } = require("../validators/auth")

router.post("/register", signupValidator, authControllers.register)
router.post("/login", loginValidator, authControllers.login)
router.get("/resetPassword", authControllers.resetPassword)

module.exports = router;