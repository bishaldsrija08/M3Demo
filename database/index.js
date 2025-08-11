const mongoose = require("mongoose")

async function connectToDatabase() {
    const connectonString = process.env.CONNECTION_STRING
    if (!connectonString) {
        throw new Error("Connection string is not defined in the environment variables.")
    }
    try {
        await mongoose.connect(connectonString)
        console.log("Connected to the database successfully.")
    } catch (error) {
        console.log("Error connectiong to the database.")
        throw error
    }
}

module.exports = connectToDatabase