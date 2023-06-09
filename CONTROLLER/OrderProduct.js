const express = require("express")
const Order = require("../MODELS/OrderproductModel");
const AddAdmin = require("../MODELS/Admin")
const mailSender = require("../tils/Emails");


exports.newOrder = async (req, res) => {
    try{
    const theAdmin = req.params.Id;
    const admin = await AddAdmin.findById(theAdmin)
    const {Name,Email,HomeAddress,quantity,phoneNumber} = req.body;
    const orderProduct = {
        Name,
        Email,
        HomeAddress,  
        quantity,
        phoneNumber,
        } 
        const created = await Order.create(orderProduct);
        await created.save(); 
        if (admin && Array.isArray(admin.order)) {
            // await created.save();
            admin.order.push(created);
            await admin.save();
        }
        const delivered = `${req.protocol}://${req.get("host")}/api/delivered/${orderProduct._id}`
        const message = `There value customer, your order have been recieve and will be delivered to you in your address your have input in your form you filled. Please click on this link ${delivered} if you have successfully recieved the goods. Thanks for patronizing us @Safe_Home-Furniture`;
        mailSender({
        email: orderProduct.Email,
        subject: "Order Placed is complete",
        message,
    });
        res.status(201).json({  
            message: "Order placed successful",
            data: created
        });  
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}


exports.getOrder = async(req, res) => {
    try{
        const allOrder = await Order.find();
        res.status(201).json({
            message: "Order was gotten",
            length: allOrder.length,
            data: allOrder,
        })
    } catch(error) {
        res.status(404).json({
            message: error.message
        })
    }
}


exports.getOneOrder = async(req,res) => {
    try{
        const orderId = req.params.orderId;
       const order = await Order.findById(orderId)
        res.status(200).json({
            message: "Single Order was successful",
            data: order
        })
    }catch(error){
        res.status(401).json({
            message: error.message
        })
    }
}
exports.deleteOrder = async(req,res) => {
    try{ 
        const orderId = req.params.orderId;
        await Order.findByIdAndDelete(orderId);
        res.status(200).json({
            message: "Order has been deleted",
        })
    }catch(error){
        res.status(401).json({
            message: error.message
        })
    }
}

exports.deliver = async(req,res)=>{
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);
        await Order.updateOne(order, {
            delivered: true
        },{new: true})
        res.status(200).json({
            message: "Delivery made is successfully.."
        }) 
    } catch (error) {
        res.status(400).json({
            mesage: error.message
        })
    }
};