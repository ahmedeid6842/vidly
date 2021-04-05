const express = require("express");
const router = express.Router();

const genresControllers = require("../controllers/genre")

const { isAdmin } = require("../middleware/isAdmin")
const { isAuth } = require("../middleware/isAuth")
const { genreValidator } = require("../validators/genre")

router.get("/", genresControllers.getGenres)
router.get("/:id", isAuth, genresControllers.getGenre)
router.post("/", genreValidator, genresControllers.addGenre)
router.put("/:id", genreValidator, genresControllers.updateGenre)
router.delete("/:id", genresControllers.deleteGenre)


module.exports = router;