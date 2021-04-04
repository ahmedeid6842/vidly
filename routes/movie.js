const express = require("express");
const router = express.Router();

const movieControllers = require("../controllers/movie");
const { isAuth } = require("../middleware/isAuth");
const { isAdmin } = require("../middleware/isAdmin");

router.get("/", movieControllers.getMovies)
router.get("/:id", isAuth, movieControllers.getMovie)
router.post("/",  movieControllers.addMovie)
router.put("/:id", movieControllers.updateMovie)
router.delete("/:id",movieControllers.deleteMovie)

module.exports = router;