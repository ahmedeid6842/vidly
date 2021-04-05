const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const auth = require("./routes/auth");
const customer = require("./routes/customer");
const genre = require("./routes/genre");
const movie = require("./routes/movie");
const rental = require("./routes/rental");

const _db = require("./helper/db");
const { isAdmin } = require("./middleware/isAdmin");
const { isAuth } = require("./middleware/isAuth");


const app = express();

require("dotenv/config");

app.use(express.json());
app.use(cookieParser());

app.use("/auth", auth)
app.use("/customer", customer)
app.use("/genres", genre)
app.use("/movies", movie)
app.use("/rentals", rental)

app.use((req, res) => {
    res.status(404).send("not found")
})


const PORT = process.env.PORT || 3000
_db.initDB((err, db) => {
    if (err) {
        console.log(err);
    } else {
        // _db.initConfiguration() //this function is used at the first time of running otherwise it's useless
        app.listen(PORT, console.log(`connected on port ${PORT}`));
    }
})


