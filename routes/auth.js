const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/auth");

router.post("/register", authControllers.register)
router.post("/login", authControllers.login)
router.get("/resetPassword", authControllers.resetPassword)

module.exports = router;