const express = require("express");
const Product = require("../MODELS/productModel");

exports.newStock = async (req, res) => {
  try{
      const productId = req.params.ProdId;
      const newStock = req.body.Stock;
      
      const product = await Product.findByIdAndUpdate(productId, {
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
