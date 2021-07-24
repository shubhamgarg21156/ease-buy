const Product = require('../models/Product');
const Order= require('../models/Order');
const Cart = require('../models/Cart');

module.exports.makeOrder = (req,res) => {

    const product_id = req.query.id;

    Product.findById(product_id,(err,product) => {

        if(err){
            req.flash('error','Some error occured');
            console.log('Error in finding the product');
            return res.redirect('back');
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


    })

}