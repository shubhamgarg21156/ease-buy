const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
        id : {
            type : mongoose.Schema.ObjectId
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        orders:  [
                {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'Order'
                }
            ]
             
},{timestamps:true});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;