const express = require('express')
const {GetallFurni,GetSingle,NewPro,DeleteFurni,UpdateFurni,GetCategoryByProduct,SearchName } = require('../CONTROLLER/product')
const { isSuperAdmin, isMachant} = require("../HELPER/athu");
//const { isSuperAdmin} = require("../HELPER/athu");
//const {newOrder} = require('../controller/orderpro');

const router = express.Router();

 router.route('/CreatePro/:Id').post(NewPro)
router.route('/AllProducts').get(GetallFurni)
router.route('/SinglePro/:proId').get(GetSingle)
router.delete('/Delete/:userId/:productid', DeleteFurni)
router.route('/Update/:userId/:id').patch(UpdateFurni)
router.route('/category/:key').get(GetCategoryByProduct)
router.route('/Search/:key').get(SearchName)
 //router.route('/order/:id').post(newOrder)

module.exports = router



// router.route('/admin/:userId').post(NewPro)

// router.delete('/admin/:userId/:productid', DeleteFurni)
// //router.get("/admin/:userId",GetAllProByAdmin)
// router.route('/admin/:userId/:productid').patch(UpdateFurni)
// router.get('/category', GetCategoryByProduct)



// module.exports = router; 