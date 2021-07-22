const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
          name : {
              type : String,
              required : true
          },
          description: {
            type:String
          },
          price : {
              type : int,
              required : true
          },
          category : {
              type : String,
              required : true
          }
    
},{timestamps:true});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;