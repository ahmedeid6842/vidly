const express = require("express");
const mongoose = require("mongoose");

const auth = require("./routes/auth");
const customer = require("./routes/customer");
const genre = require("./routes/genre");
const movie = require("./routes/movie");
const rental = require("./routes/rental");

const app = express();

app.use(express.json());

app.use("/auth", auth)
app.use("/customer", customer)
app.use("/genres", genre)
app.use("/movies", movie)
app.use("/rentals", rental)

app.use((req, res) => {
    res.status(404).send("not found")
})


const PORT = process.env.PORT || 3000
mongoose.connect("mongodb://localhost/vidly")
    .then(() => app.listen(PORT, console.log(`connected successfully${PORT}`)))
    .catch((err) => console.log(err.message));

