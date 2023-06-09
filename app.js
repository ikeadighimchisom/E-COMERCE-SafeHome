require("dotenv").config();
const dotenv = require("dotenv")
const express = require("express")
dotenv.config({path: "./CONFIG/config.env"})
const fileUpload = require('express-fileupload');
const admin = require('./ROUTE/admin')
const superadmin = require("./ROUTE/superDmin")
const user = require ('./ROUTE/user')
const Authen = require("./ROUTE/superDmin")
const Product = require("./ROUTE/productRoute")
const category = require("./ROUTE/categoryRoute")
const InStock = require ("./ROUTE/ProductInStock");
const rating = require("./ROUTE/Rating");
const Order = require("./ROUTE/OrderProduct")
const AddToCart = require("./ROUTE/AddCartRoute")
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
app.use("/api", Authen)
//app.use('/api', router);
app.use("/api", admin)
app.use("/api", superadmin)
app.use("/api",user)
app.use("/api", Product)
app.use("/api",category)
app.use("/api", InStock)
app.use("/api", rating)
app.use("/api", Order)
app.use("/api",AddToCart)
module.exports = app  


 