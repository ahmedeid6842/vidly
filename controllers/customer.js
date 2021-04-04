const { ObjectId } = require("mongodb")
const _ = require("lodash");

const _db = require("../helper/db").getDB

module.exports.getCustomers = async (req, res) => {
    const customers = await _db()
        .db()
        .collection("customers")
        .find()
        .toArray();
    if (customers.length === 0) return res.status(404).send({ msg: "no customers found" })

    return res.status(200).send(customers);
}

module.exports.getCustomer = async (req, res) => {
    const customer = await _db()
        .db()
        .collection("customers")
        .findOne({ _id: ObjectId(req.params.id) });

    if (!customer) return res.status(404).send("no customer found")

    return res.status(200).send(customer);
}

module.exports.addCutomer = async (req, res) => {
    // validate a customer

    try {
        const user = await _db()
            .db()
            .collection("customers")
            .insertOne(req.body);

        return res.status(201).send({
            _id:_.pick(user, ["insertedId"]),
            msg: "added successfully"
        })
    } catch (err) {
        res.send(err)
        //email is unique
    }
}

module.exports.updateCutomer = async (req, res) => {

    try {
        //update a customer
        const { value: customer } = await _db() //destrucuture the returned object "value" rename "customer"
            .db()
            .collection("customers")
            .findOneAndUpdate( //use "findOneAndUpdate" instead of "updateOne" because it can return the updated docuement ,,, same thing in delete
                { _id: ObjectId(req.params.id) },
                { $set: req.body },
                { returnOriginal: false } //to return the deleted document
            )

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
        //delete acusotmer
        const { value: customer } = await _db()
            .db()
            .collection("customers")
            .findOneAndDelete(
                { _id: ObjectId(req.params.id) },
                { returnOriginal: true } //to return the deleted document
            )

        if (!customer) return res.status(404).send({ msg: "no customer with that ID" });

        return res.status(200).send({
            customer,
            msg: "deleted successfully"
        })
    } catch (err) {
        return res.send(err.message); //validate id - must be 12 character 
    }
}
