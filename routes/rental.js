const express = require("express");
const router = express.Router();

const rentalControllers = require("../controllers/rental")

router.get("/", rentalControllers.getRentals)
router.get("/:id", rentalControllers.getRental)
router.post("/", rentalControllers.addRental)
router.put("/:id", rentalControllers.updateRental)
router.delete("/:id", rentalControllers.deleteRental)
router.put("/movieback/:id", rentalControllers.rentalBack)

module.exports = router;