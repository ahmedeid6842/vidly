const express = require("express");
const router = express.Router();

const customerControllers = require("../controllers/customer")
const { isAuth } = require("../middleware/isAuth");
const { isAdmin } = require("../middleware/isAdmin");

router.get("/", customerControllers.getCustomers)
router.get("/:id", customerControllers.getCustomer)
router.post("/", customerControllers.addCutomer)
router.put("/:id", customerControllers.updateCutomer)
router.delete(":id", customerControllers.deleteCutomer)
router.post("/", [isAdmin, isAuth], customerControllers.addCutomer)
router.put("/:id", [isAdmin, isAuth], customerControllers.updateCutomer)
router.delete("/:id", [isAdmin, isAuth], customerControllers.deleteCutomer)
router.post("/", customerControllers.addCutomer)
router.put("/:id", customerControllers.updateCutomer)
router.delete("/:id", customerControllers.deleteCutomer)

module.exports = router;