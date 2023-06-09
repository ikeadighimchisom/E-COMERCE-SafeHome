const express = require("express");
const prod = require("../MODELS/productModel");

exports.newRating = async (req, res) => {
    try{
        const productId = req.params.proid;
        const newRating = req.body.rating;
        
        const product = await prod.findByIdAndUpdate(productId, {
            rating: newRating
        });
       res.status(200).json({
           message: "Product rated successfully!",
             data: product,
    });
    }catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}

