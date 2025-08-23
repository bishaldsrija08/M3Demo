const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req,file, cb){
        const isAllowed = ["image/png", "image/jpeg", "image/jpg", "image/gif"]
        if(!isAllowed.includes(file.mimetype)){
            throw new Error("file type is not allowed!")
        }
        cb(null, "./uploads")
    },
    filename: function(req,file,cb){
        cb(null, Date.now()+"_"+file.originalname)
    }
})
module.exports = {multer, storage}