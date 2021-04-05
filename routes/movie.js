const express = require("express");
const router = express.Router();

const movieControllers = require("../controllers/movie");
const { isAuth } = require("../middleware/isAuth");
const { isAdmin } = require("../middleware/isAdmin");
const { movieValidator, movieUpdateValidator } = require("../validators/movies")


router.get("/", movieControllers.getMovies)
router.get("/:id", movieControllers.getMovie)
router.post("/", movieValidator, movieControllers.addMovie)
router.put("/:id", movieUpdateValidator, movieControllers.updateMovie)
router.delete("/:id", movieControllers.deleteMovie)

module.exports = router;