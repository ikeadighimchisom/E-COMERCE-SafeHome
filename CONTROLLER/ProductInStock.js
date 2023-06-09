const express = require("express");
const Stock = require("../MODELS/productModel");

exports.newStock = async (req, res) => {
  try{
      const productId = req.params.ProId;
      const newStock = req.body.Stock;
      
      const product = await Stock.findByIdAndUpdate(productId, {
          stockQuantity: newStock
      });
     res.status(200).json({
         message: "Product stock was successfull!",
           data: product,
  }); 
  }catch(error){
      res.status(400).json({
          message: error.message
      })
  }
}
