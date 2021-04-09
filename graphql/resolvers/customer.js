const { UserInputError } = require("apollo-server-errors");
const { ObjectId } = require("mongodb");
const { validateCustomer } = require("../../validators/customer")

const isAuth = require("../../utils/isAuth");
const isAdmin = require("../../utils/isAdmin");

module.exports = {
    Query: {
        //adding customer's Query resolvers
        async getCustomer(_, { customerId }, { _db }) {
            // find a customer by id
            const customer = _db()
                .db()
                .collection('customers')
                .findOne({ _id: ObjectId(customerId) })
            if (!customer) throw new Error("customer not found")
            return customer;

        },
        async getCustomers(parent, args, { _db }, info) {
            const customers = _db()
                .db()
                .collection('customers')
                .find()
                .toArray()
            if (customers.length === 0) throw new Error("no Customers yets")
            return customers;
        }
    },
    Mutation: {
        //adding customer's Mutation resolvers
        async createCustomer(parent, { data }, { _db, req }) {
            //check authecication & authorization
            const decoded = isAuth(req)
            isAdmin(decoded);

            //validate customer input
            const { error } = validateCustomer(data);
            if (error) throw new UserInputError("validattion error", {
                erros: error.message
            })

            //create customer
            let { insertedId, ops } = await _db()
                .db()
                .collection("customers")
                .insertOne(data)

            //return customer
            return {
                insertedId,
                ...ops[0]
            }
        },

        async updateCustomer(parent, { customerId, data }, { _db, req }) {
            const decoded = isAuth(req)
            isAdmin(decoded);

            //TODO: validate update customer Input 
            
            //check if there are customer with that Id && if not throw error &&if yes update it 
            const { value: customer } = await _db()
                .db()
                .collection('customers')
                .findOneAndUpdate({ _id: ObjectId(customerId) }, { $set: data }, { returnOriginal: false })
            if (!customer) throw new Error("no customer with that id")
            return customer
        },
        async deleteCustomer(parent, { customerId }, { _db, req }) {
            const decoded = isAuth(req)
            isAdmin(decoded);

            //check if there are customer with that Id && if not throw error &&if yes delete it 
            const { value: customer } = await _db()
                .db()
                .collection('customers')
                .findOneAndDelete({ _id: ObjectId(customerId) }, { returnOriginal: false })
            if (!customer) throw new Error("no customer with that id")
            return customer
        }

    }
}



