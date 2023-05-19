require("dotenv").config();
const dotenv = require("dotenv")
const express = require("express")
dotenv.config({path: "./CONFIG/config.env"})
const fileUpload = require('express-fileupload');
const user = require('./ROUTE/admin')

const app = express ();

//app.use( cors ());
app.use(express.json());
app.use(fileUpload({
    useTempFiles:true
})) 

app.get("/", (req, res) => {
    res.status(200).send("WELCOME TO OUR E-COMMERCE WEBSITE")
})

//app.use("/api/import", importData)

//app.use('/api', Auth);
//app.use("/api", Authen)
//app.use('/api', router);
app.use("/api", user)

// app.use(notfound) 
//app.use(errorHandler)

module.exports = app  


