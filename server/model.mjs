import mongoose from 'mongoose';

mongoose.connect(
    "mongodb://localhost:27017/users_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

/**
 * Create a user
 * @param {String} email 
 * @param {String} password 
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
 const createUser = async (email, password) => {
    const user = new User({ email: email, password: password});
    return user.save();
}

/**
 * Retrieve user based on the given email parameter
 * @param {String} email
 * @returns 
 */
 const findUserByEmail = async (userEmail) => {
    const query = User.find({ email: userEmail});
    return query.exec();
}

const businessSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

const Business = mongoose.model("Business", businessSchema);

/**
 * Create a business
 * @param {String} name 
 * @param {String} description 
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
 const createBusiness = async (name, description) => {
    const business = new Business({ name: name, description: description});
    return business.save();
}

/**
 * Retrieve all businesses.
 * @returns 
 */
 const findBusinesses = async () => {
    const query = Business.find({});
    return query.exec();
}

export { createUser, findUserByEmail, createBusiness, findBusinesses };