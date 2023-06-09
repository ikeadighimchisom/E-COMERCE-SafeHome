const express = require("express");

const stockRouter = express.Router()

const {newStock} = require('../CONTROLLER/ProductInStock');
//const {realAdmin} = require("../helper/auth")




stockRouter.patch("/Stocks/:ProId",newStock)
//router.post("/rate/:id",newRating)

module.exports = stockRouter;