const express = require("express");

const orderRouter = express.Router()

const {newOrder,getOrder,deleteOrder,getOneOrder,deliver} = require('../CONTROLLER/OrderProduct');
const {realAdmin} = require("../HELPER/athu")




orderRouter.post("/Ordering/:userId",newOrder)
orderRouter.get("/order/:userId",getOrder)
orderRouter.delete("/order/:userId/:orderId",deleteOrder)
orderRouter.get("/order/:userId/:orderId",getOneOrder)
orderRouter.post("/delivered/:orderId",deliver);

module.exports = orderRouter;

