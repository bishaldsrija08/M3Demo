//Env config
require("dotenv").config()

// Require express
const express = require("express")

//Db connect import
const connectToDatabase = require("./database")
const User = require("./model/useModel")
const Blog = require("./model/blogModel")
const app = express()

connectToDatabase() // Connect to the database

// parse json
app.use(express.json())

// Create User

app.post("/create", async (req, res) => {
    const { username, password, email } = req.body
    if (!username || !password || !email) {
        return res.status(400).json({
            message: "All fields are required."
        })
    }
    await User.create({
        username,
        password,
        email
    })
    return res.status(200).json({
        message: "User created successfully."
    })
})

//create blog

app.post("/blog", async (req, res) => {
    const { description, title, subTitle, image } = req.body
    if (!description || !title || !subTitle || !image) {
        return res.status(400).json({
            message: "All fields are required."
        })
    }
    await Blog.create({
        description,
        title,
        subTitle,
        image
    })
    return res.status(200).json({
        message: "Blog created successfully."
    })
})










const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})