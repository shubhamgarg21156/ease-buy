const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
          name : {
              type : String,
              required : true
          },
          image : {
               type:String,
               required:true
          },
          zoomedimage : {
               type:String,
               required:true
          },
          description: {
            type:String
          },
          price : {
              type : String,
              required : true
          },
          category : {
              type : String,
              required : true
          },
          ratings : {
              type:String,
              required:true
          },
          saleprice : {
              type:String,
          }
    
},{timestamps:true});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;