const express = require("express");
const router = express.Router();

const rentalControllers = require("../controllers/rental")

const { isAuth } = require("../middleware/isAuth");
const { isAdmin } = require("../middleware/isAdmin");

router.get("/", rentalControllers.getRentals)
router.get("/:id", rentalControllers.getRental)
router.post("/", [isAuth, isAdmin], rentalControllers.addRental)
router.put("/:id", [isAuth, isAdmin], rentalControllers.updateRental)
router.delete("/:id", [isAuth, isAdmin], rentalControllers.deleteRental)
router.put("/movieback/:id", [isAuth, isAdmin], rentalControllers.rentalBack)

module.exports = router;