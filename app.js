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

//Multer
const { storage, multer } = require("./middleware/multerConfig")
const upload = multer({ storage: storage })

// Upload access
app.use(express.static("uploads"))

//Fs
const fs = require("fs")

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

app.post("/blog", upload.single("image"), async (req, res) => {
    const { description, title, subTitle } = req.body
    if (!req.file) {
        return res.status(400).json({
            message: "Image file is required!"
        })
    }
    const fileName = req.file.filename
    if (!description || !title || !subTitle) {
        return res.status(400).json({
            message: "All fields are required."
        })
    }
    await Blog.create({
        description,
        title,
        subTitle,
        image: fileName
    })
    return res.status(200).json({
        message: "Blog created successfully."
    })
})

//get all blogs

app.get("/blogs", async (req, res) => {
    const blogs = await Blog.find()
    if (blogs.length === 0) {
        return res.status(400).json({
            message: "No blogs found!"
        })
    }
    return res.status(200).json({
        message: "Blog fetched successfully.",
        data: blogs
    })
})

// Single blog

app.get("/blog/:id", async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findById(id)
    if (!blog) {
        return res.status(400).json({
            message: "No blog found!"
        })
    }
    res.status(200).json({
        message: "Blog Fetched Successfully.",
        data: blog
    })
})

// delete blog

app.delete("/blog/:id", async (req, res) => {
    const { id } = req.params
    const isBlog = await Blog.findById(id)
    if (!isBlog) {
        return res.status(400).json({
            message: "Blog is not found!"
        })
    }
    fs.unlink(`uploads/${isBlog.image}`, (err)=>{
        if(err){
            console.log("Error ayo")
        }else{
            console.log("Delete vayo")
        }
    })
    await Blog.findByIdAndDelete({ _id: id })
    return res.status(200).json({
        message: "Blog deleted successfully."
    })
})




const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})