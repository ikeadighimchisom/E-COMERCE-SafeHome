const express = require("express");

const stockRouter = express.Router()

const {newStock} = require('../CONTROLLER/ProductInStock');





stockRouter.patch("/Stocks/:ProdId",newStock)


module.exports = stockRouter;