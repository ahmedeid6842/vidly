const mongoose = require("mongoose");
const _ = require("lodash");
const { Customer, validateCustomer } = require("../models/customer");

module.exports.getCustomers = async (req, res) => {
    if (customer.length === 0) return res.status(404).send("no customers found")
    return res.status(200).send(customer);
}

module.exports.getCustomer = async (req, res) => {

    if (!customer) return res.status(404).send("no customer found")

    return res.status(200).send(customer);
}

module.exports.addCutomer = async (req, res) => {

    const { error } = validateCustomer(req.body)
    if (error) return res.status(402).send(error.message);

    try {
        return res.status(201).send({
            _id: _.pick(user, ["_id"]),
            msg: "added successfully"
        })
    } catch (err) {
        //email is unique
    }
}

module.exports.updateCutomer = async (req, res) => {

    try {
        //update a customer
        if (!customer) return res.status(404).send("no customer with that ID");

        return res.status(201).send({
            customer,
            msg: "update successfully"
        })
    } catch (err) {
        return res.send(err.message); //validate id - must be 12 character 
    }
    
}

module.exports.deleteCutomer = async (req, res) => {

    try {
        if (!customer) return res.status(404).send("no customer with that ID");
        return res.status(200).send({
            customer,
            msg: "deleted successfully"
        })
    } catch (err) {
        return res.send(err.message); //validate id - must be 12 character 
    }
}
