const express = require("express")
const Carts = require("../MODELS/AddCartModel");

// exports.AddToCart = async (req, res) => {
//     try{
//     const {productId,price,userId,quantity} = req.body;
//     const AddCart = await Carts.create ({
//         product_id,
//         price,
//         isMachant_id,
//         })           
//         res.status(201).json({
//             message: "Cart is successful",
//             data: AddCart
//         });
//     }catch(e){
//         res.status(400).json({
//             message: e.message  
//         });
//     }
// }
exports.AddToCart = async (req, res) => {
    try {
      const { productId, price,userId, quantity } = req.body;
      
      // Create a new cart entry
      const cart = new Carts({productId,price,userId, quantity });
      await cart.save();
  
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while adding the product to the cart.' });
    }
  };
  
//   // Get user's cart
  exports.GetAddCart = async (req, res) => {
    try {
      const { userId } = req.params.userId;
      
      // Find all cart entries for the user
      const carts = await Carts.find({ userId });
      
      res.json(carts);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the user\'s cart.' });
    }
  };
  
//   // Checkout
  exports.CheckOut = async (req, res) => {
    try {
      const { userId } = req.body;
  
      // Delete user's cart entries after checkout
      await Carts.deleteMany({ userId });
  
      res.json({ message: 'Checkout successful!' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during the checkout process.' });
    }
  };