const express = require("express")
const app = express()
const envConfig = require("dotenv")
envConfig.config()



app.get("/", (req,res)=>{
    console.log("Hello from / get")
})










const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`)
})