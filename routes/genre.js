const express = require("express");
const router = express.Router();

const genresControllers = require("../controllers/genre")

router.get("/", genresControllers.getGenres)
router.get("/:id", genresControllers.getGenre)
router.post("/", genresControllers.addGenre)
router.put("/:id", genresControllers.updateGenre)
router.delete(":id", genresControllers.deleteGenre)

module.exports = router;