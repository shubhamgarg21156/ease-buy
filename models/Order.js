const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
          product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
          },
          quantity : {
              type : int,
              required : true
          },
          user : {
              type : mongoose.Schema.Types.ObjectId,
              ref : 'User'
          }  
},{timestamps:true});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;