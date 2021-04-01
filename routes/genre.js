const express = require("express");
const router = express.Router();

const genresControllers = require("../controllers/genre")

const { isAdmin } = require("../middleware/isAdmin")
const { isAuth } = require("../middleware/isAuth")

router.get("/", genresControllers.getGenres)
router.get("/:id", isAuth, genresControllers.getGenre)
router.post("/", [isAuth, isAdmin], genresControllers.addGenre)
router.put("/:id", [isAuth, isAdmin], genresControllers.updateGenre)
router.delete("/:id", [isAuth, isAdmin], genresControllers.deleteGenre)


module.exports = router;