const express = require("express");

const router = express.Router()

const {newRating} = require('../CONTROLLER/Rating');
//const {realAdmin} = require("../helper/auth")




router.patch("/rate/:id",newRating)
//router.post("/rate/:id",newRating)



module.exports = router;