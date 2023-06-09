const express = require("express");

const AddCartRouter = express.Router()

const {AddToCart,GetAddCart,CheckOut} = require('../CONTROLLER/AddCart');
//const {IsSuperAdmin} = require("../helper/auth")




AddCartRouter.route("/AddCart").post(AddToCart);
AddCartRouter.route("/GetCart/:userId").get(GetAddCart);
AddCartRouter.route("/checkOut").post(CheckOut)
// //cateRouter.route('/products/:category').get(getProductsByCategoryName)
// //cateRouter.route("/products/:categoryName").get(getCategoryByName)
module.exports = AddCartRouter;




