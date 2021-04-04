const moment = require("moment")
module.exports.rentalPrice = function (dateOut, dailyRentalRate) { // this function to calculate the price of rental when the movie is returned

    const rentalDay = moment().diff(dateOut, 'days'); //calculate the nOf days when the movie is rentaled untill now"time it returned"
    const rentalFee = rentalDay * dailyRentalRate; //calculate the price
    return rentalFee;
}