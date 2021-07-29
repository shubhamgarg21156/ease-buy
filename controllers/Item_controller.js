const Product = require('../models/Product');
const Order= require('../models/Order');
const Cart = require('../models/Cart');

module.exports.makeOrder = (req,res) => {

    const product_id = req.query.id;

    Product.findById(product_id,async (err,product) => {

        if(err){
            req.flash('error','Some error occured');
            console.log('Error in finding the product');
            return res.redirect('back');
        }

        Cart.find({user : req.user._id}).populate({
            path : 'orders',
            populate : {
                path : 'product'
            }
        }).exec(async function(err,cart)
        {
            for(var i=0;i<cart[0].orders.length;i++){
                if(cart[0].orders[i].product._id == product_id){
                    req.flash('error','Product is already in the cart');
                    console.log('Product is already in the cart');
                    return res.redirect('back');
                }
            }

        Order.create({
                product : product,
                quantity : 1,
                user : req.user
        },function(err,order){

            if(err){
                req.flash('error','Some error occured');
                console.log('Error in making the order');
                return res.redirect('back');
            }

            Cart.findByIdAndUpdate(req.user.cart._id,{$push : {orders : order}},function(err,cart){

                if(err){
                    req.flash('error','Some error occured');
                    console.log('Error in finding the Cart');
                    return res.redirect('back');
                }

                req.flash('success',"Item Added");
                console.log("Product Added Successfully");
                return res.redirect('back');

            })

        })

        });
        
    

    })

}

module.exports.removeItem = (req,res) => {

    var order_id = req.query.id;
    
    Order.findById(order_id,async (err,order) => {

        if(err){
            req.flash('error','Some error occured');
            console.log('Error in finding the Order');
            return res.redirect('back');
        }

        
        Cart.findByIdAndUpdate(req.user.cart._id,{$pull : {orders : order_id}},function(err,cart){

            if(err){
                req.flash('error','Some error occured');
                console.log('Error in finding the Cart');
                return res.redirect('back');
            }

            req.flash('success',"Item Removed");
            console.log("Item Removed Successfully");
            return res.redirect('back');

        })
        
    })

}

module.exports.openProduct = (req,res) => {

    Product.findOne(req.query.id, (err,product) => {
        res.render('product' , {
            product : product
        });
    })
    
}
module.exports.categories = (req,res) => {
    res.render('categories');
}