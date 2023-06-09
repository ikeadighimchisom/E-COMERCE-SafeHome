const mongoose = require("mongoose");
// const Schema = new mongoose.Schema
const cateSchema = new mongoose.Schema ({
    categoryName: {
        type: String,
        require: [true, "categoryName must be specified."]
    },
   },
   
   {
    timestamps: true
   });

   const cates = mongoose.model("cates", cateSchema)
   module.exports = cates;