const express = require("express");

const cateRouter = express.Router()

const {NewCates,getAllCates,getCategoryByName,GetCategoryByProduct} = require('../CONTROLLER/category');
//const {IsSuperAdmin} = require("../helper/auth")




cateRouter.route("/cates").post(NewCates);
 cateRouter.route("/allCates/category").get(getAllCates)
 cateRouter.route("/categories/:name").get(getCategoryByName)
//cateRouter.route('/products/:category').get(getProductsByCategoryName)
//cateRouter.route("/products/:categoryName").get(getCategoryByName)
module.exports = cateRouter;

