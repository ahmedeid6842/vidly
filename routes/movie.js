const express = require("express");
const router = express.Router();

const movieControllers = require("../controllers/movie");

router.get("/", movieControllers.getMovies)
router.get("/:id", movieControllers.getMovie)
router.post("/", movieControllers.addMovie)
router.put("/:id", movieControllers.updateMovie)
router.delete(":id", movieControllers.deleteMovie)

module.exports = router;