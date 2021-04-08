const { UserInputError } = require("apollo-server")
const bcrypt = require("bcrypt");

const { validateLogin, validateSignup } = require("../../validators/auth")
const { generateAccessToken } = require("../../helper/tokens")
module.exports = {
    Mutation: {
        //adding authentication's Mutation resolvers
        
        async register(_, { data }, { _db }) {
            //validate args
            const { error } = validateSignup(data)
            if (error) throw new UserInputError('validation Error', { errors: error.message });
            let { email, name, password } = data;

            //email is unique
            let user = await _db()
                .db()
                .collection("users")
                .findOne({ email })
            if (user) throw new UserInputError("Email is taken", {
                error: "this Email is taken"
            })

            //hash password
            password = await bcrypt.hash(password, 12)

            //createUser with email ,password ,name
            let { insertedId, ops } = await _db()
                .db()
                .collection('users')
                .insertOne({ email, name, password })

            //generateToken
            const token = await generateAccessToken(insertedId)
            //send token,email,name,_id
            return {
                token,
                ...ops[0]
            }
        },
        async login(_, { data }, { req, _db }) {
            //validate args
            const { error } = validateLogin(data)
            if (error) throw new UserInputError("validation Error", {
                errors: error.message
            })

            let { email, password } = data;

            //check if email exists
            let user = await _db()
                .db()
                .collection('users')
                .findOne({ email })
            if (!user) throw new UserInputError("email not found", {
                errors: "this email not found"
            })

            //compare password
            let verified = await bcrypt.compare(password, user.password)
            if (!verified) throw new UserInputError("incorrect password", {
                errors: "this password is invalid"
            })

            //genreateToken
            const token = await generateAccessToken(user._id);
            
            //send token,email,name,_id 
            delete user.password
            return {
                ...user,
                token
            }
        }
        async register(_, args, { _db }) {

        }
    }
}