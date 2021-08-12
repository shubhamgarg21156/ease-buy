const Cart = require('../models/Cart');
const Wishlist = require('../models/Wishlist');

module.exports.cart = (req,res) => {
    
    Wishlist.findOne({user: req.user.id} , (err,wishlist)=> {

        Cart.find({user : req.user._id}).populate({
            path : 'orders',
            populate : {
                path : 'product'
            }
        }).exec(async function(err,cart)
        {
            res.render('cart',{
                title : 'cart',
                orders : cart[0].orders,
                wishlist : wishlist
            });
        });


    })
}