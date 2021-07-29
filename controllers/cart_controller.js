const Cart = require('../models/Cart');

module.exports.cart = (req,res) => {
    
    Cart.find({user : req.user._id}).populate({
        path : 'orders',
        populate : {
            path : 'product'
        }
    }).exec(async function(err,cart)
    {
        res.render('cart',{
            title : 'cart',
            orders : cart[0].orders
        });
    });
}