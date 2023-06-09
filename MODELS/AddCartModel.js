const mongoose = require('mongoose')
const CartSchema = mongoose.Schema({
    productId:[{
        type: mongoose.Schema.Types.ObjectId,
         ref: "product"
      }],
  price: {
    type: String,
    required: true, 
  },
  userId: {
    type: String,
    require: true,
  },
  quantity: {
    type: String,
    require: true,
  },
},    
  {
    timestamps: true
  })

const AddCart = mongoose.model('AddCart', CartSchema)
module.exports = AddCart

