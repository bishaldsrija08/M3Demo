//Env config
const envConfig = require("dotenv").config()

// Require express
const express = require("express")

//Db connect import
const connectToDatabase = require("./database")
const app = express()

connectToDatabase() // Connect to the database


// Simple get api
app.get("/", (req,res)=>{
    console.log("Hello")
    res.status(200).json({
        message: "Welcome to the API."

    })
})










const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`)
})