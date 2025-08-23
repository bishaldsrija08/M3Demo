const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    subTitle: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
}, {
    timestamps: true
})

const Blog = mongoose.model("Blog", blogSchema)
module.exports = Blog