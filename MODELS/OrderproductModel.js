const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: [true, "Name is required"]
    },
     Email: {
        type: String,
        require: [true, "Email is required"],
    },
    HomeAddress: {
        type: String,
        require: [true, "HomeAddress is required"],
    },
    quantity: {
        type: Number, 
        default: 1,
        // require: [true, "This place cannot be empty"],

    },
    phoneNumber: {
        type: String,
        require: [true, "phoneNumber is required"],
    },
    Product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    delivery:{
        type: Boolean,
        default: false
    },
    delivered: {
        type: Boolean,
        default: false
    },
},{
    timestamps: true
});

const order  = mongoose.model("order", orderSchema);

module.exports = order;
