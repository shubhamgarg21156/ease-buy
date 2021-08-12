const Product = require('../models/Product');
const Wishlist = require('../models/Wishlist');
const Cart = require('../models/Cart');

module.exports.wishlist = (req,res) => {
    Wishlist.findOne({user : req.user.id}).populate('products').exec( (err,wishlist) => {

        if(err){
            console.log("Error in loading wishlist page");
            req.flash('err','Some error occured');
            return res.redirect('back');
        }

        Cart.findOne({user : req.user.id}).populate('orders').exec((err,cart) => {

            var cartproducts = [];

            for(let i=0;i<cart.orders.length;i++){
                cartproducts.push(cart.orders[i].product._id.toString().trim());
            }

            return res.render('wishlist',{
                items : wishlist.products,
                cartproducts : cartproducts
            })

        })
       
    
    })

    
}

module.exports.addtowishlist = async (req,res) => {


    Product.findOne({ _id : req.query.id } , (err,product) => {


        if(err){
            console.log("error in finding product while loading wishlist");
            req.flash('error',"Some error occured");
            return res.redirect('back');
        }

        Wishlist.findOne({user : req.user.id}).populate('products').exec((err,wishlist) => {
            let isproduct;
            for(let i=0;i<wishlist.products.length;i++){
                if(wishlist.products[i]._id == req.query.id){
                    isproduct = req.query.id;
                    break;
                }
            }
            if(isproduct){
                    Wishlist.findByIdAndUpdate(req.user.wishlist, {$pull: {products : {$in: [{_id : product._id}] }}} , async function(err,wishlist){
                        if(err){
                            console.log(`${err},Error in finding wishlist`);
                            req.flash('error',"Some error occured");
                            return res.redirect('back');
                        }
            
                        console.log(wishlist);
                        req.flash('success','Item removed from wishlist');
                        return res.redirect('back');
                    })
            
                }
                else{
                    Wishlist.findByIdAndUpdate(req.user.wishlist, {$push : {products : product}} , async function(err,wishlist){
                        if(err){
                            console.log(`${err},Error in finding wishlist`);
                            req.flash('error',"Some error occured");
                            return res.redirect('back');
                        }
            
                       console.log(wishlist);
                        req.flash('success','Item added to wishlist');
                        return res.redirect('back');
                    })
                }
        })
    })
}