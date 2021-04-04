
module.exports.getGenres = async (req, res) => {
    if (genres.length === 0) return res.send("no genres found");

    return res.send(genres);
}

module.exports.getGenre = async (req, res) => {
    if (!genre) return res.send("no genre with that id");

    return res.send(genre);
}

module.exports.addGenre = async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(402).send(error.message);


    res.send({
        genre,
        msg: "added succesfully"
    });
}

module.exports.updateGenre = async (req, res) => {
    try {
       //update genre with id
        if (!genre) return res.send("no genre with that id")

        return res.send({
            genre,
            msg: "updated successfully"
        });

    } catch (err) { //try-catch for id parameter validation > 12 character 
        return res.status(402).send(err.message)
    }
}

module.exports.deleteGenre = async (req, res) => {
    try {
        if (!genre) return res.send("no genre with that id")

        return res.send({
            genre,
            msg: "deleted successfully"
        });
    } catch (err) {
        return res.status(402).send(err.message);
    }
}