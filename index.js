const express = require("express");
const app = express();
const multer = require("multer");
const cors = require('cors')
app.use(express.json())


const abc = require("./routes/auth");
app.use("/api/auth", abc);


const a = require("./routes/posts");
app.use("/api/posts", a);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded")
})



app.listen('5000',()=>{
    console.log("hey there ")
})


