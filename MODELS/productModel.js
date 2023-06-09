const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"]
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  image: {
    type: String,
  },
  cloudId: {
    type: String,
  },
  price: {
    type: String,
    required: [true, "price is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"]
    // ref: "cates",
  },
  stockQuantity: {
    type: Number,
    required: [true, "stockQuantity is required"]
  },
  rating:{ 
    type: Number,
     default: 0,
  },
  brandName: {
    type: String,
    required: [true, "brandName is required"]
  }, 
  Order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order"
 },
  Admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AddUser"
 },
},    
  {
    timestamps: true
  })

const product = mongoose.model('product', productSchema)
module.exports = product

