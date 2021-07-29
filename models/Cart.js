const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        orders:  [
                {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'Order',
                    default : []
                }
            ]
             
},{timestamps:true});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;