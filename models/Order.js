const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
          product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product",
            required:true
          },
          quantity : {
              type : String,
              required : true
          },
          user : {
              type : mongoose.Schema.Types.ObjectId,
              ref : 'User',
              required:true
          }  
},{timestamps:true});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;