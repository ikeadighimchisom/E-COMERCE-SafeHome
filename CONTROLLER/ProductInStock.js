const express = require("express");
const Stock = require("../MODELS/productModel");

exports.newStock = async (req, res) => {
  try {
    const productId = req.params.proid;
    const newStock = req.body.Stock;

    const stock = await Stock.findOneAndUpdate(
      { product: productId },
      { stockQuantity: newStock },
      { new: true }
    );

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found"
      });
    }

    return res.status(200).json({
      message: "Stock quantity was successfully updated!",
      data: stock
    });
  } catch (error) {
    console.error("Error updating stock quantity:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};


