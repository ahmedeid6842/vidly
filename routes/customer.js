const express = require("express");
const router = express.Router();

const customerControllers = require("../controllers/customer")
const { isAuth } = require("../middleware/isAuth");
const { isAdmin } = require("../middleware/isAdmin");

router.get("/", customerControllers.getCustomers)
router.get("/:id", customerControllers.getCustomer)
router.post("/", [isAdmin, isAuth], customerControllers.addCutomer)
router.put("/:id", [isAdmin, isAuth], customerControllers.updateCutomer)
router.delete("/:id", [isAdmin, isAuth], customerControllers.deleteCutomer)


module.exports = router;