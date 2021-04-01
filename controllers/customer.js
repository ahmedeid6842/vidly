const mongoose = require("mongoose");
const _ = require("lodash");
const { Customer, validateCustomer } = require("../models/customer");

module.exports.getCustomers = async (req, res) => {
    let customer = await Customer.find();
    if (customer.length === 0) return res.status(404).send("no customers found")
    return res.status(200).send(customer);
}

module.exports.getCustomer = async (req, res) => {

    let customer = await Customer.findById(mongoose.Types.ObjectId(req.params.id)); //cast customer id parameter and convert it from string to objectID
    if (!customer) return res.status(404).send("no customer found")

    return res.status(200).send(customer);
}

module.exports.addCutomer = async (req, res) => {

    const { error } = validateCustomer(req.body)
    if (error) return res.status(402).send(error.message);

    try {
        const user = await Customer.create(req.body);
        return res.status(201).send({
            _id: _.pick(user, ["_id"]),
            msg: "added successfully"
        })
    } catch (err) {
        if (err.name === "MongoError" && err.code === 11000) {
            return res.status(402).send(`_id of Customer must be unique ... "${err.keyValue._id}" is already found`);
        } else {
            return res.status(400).send(err.message);
        }
    }
}

module.exports.updateCutomer = async (req, res) => {

    try {
        const customer = await Customer.findByIdAndUpdate(
            mongoose.Types.ObjectId(req.params.id), //cast to objectID
            req.body,
            { new: true } //return the new document after updated
        );
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
        const customer = await Customer.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id));
        if (!customer) return res.status(404).send("no customer with that ID");
        return res.status(200).send({
            customer,
            msg: "deleted successfully"
        })
    } catch (err) {
        return res.send(err.message); //validate id - must be 12 character 
    }
}
