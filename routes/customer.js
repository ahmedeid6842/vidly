const express = require("express");
const router = express.Router();

const customerControllers = require("../controllers/customer")
const { isAuth } = require("../middleware/isAuth");
const { isAdmin } = require("../middleware/isAdmin");
const { customerValidator, customerUpdateValidator } = require("../validators/customer")

router.get("/", customerControllers.getCustomers)
router.get("/:id", customerControllers.getCustomer)
router.post("/", customerValidator, customerControllers.addCutomer)
router.put("/:id", customerUpdateValidator, customerControllers.updateCutomer)
router.delete("/:id", customerControllers.deleteCutomer)


module.exports = router;